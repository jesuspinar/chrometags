import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { NDEFMessage, NDEFReadingEvent, NDEFRecord, NDEFRecordType } from "../types/Nfc";
import { Record } from "../types/Record";
import useMapper from "../hooks/useMapper";
import { toast } from "react-toastify";
import { Tag } from "../types/Tag";

interface NFCContextType {
	tags: Tag[];
	history: Tag[];
	errorMessage: string;
	supported: boolean;
	setTagsFromData: (tags: Tag[]) => void;
	setHistoryFromData: (tags: Tag[]) => void;
	appendTag: (tag: Tag) => void;
	removeTag: (serialNumber: string) => void;
	abortAction: () => void;
	read: (save?: boolean) => Promise<Tag | false>;
	write: (records: Record[]) => Promise<boolean>;
	clearHistory: () => void;
}

const NFCContext = createContext<NFCContextType | undefined>(undefined);

export const useNFC = () => {
	const context = useContext(NFCContext);
	if (!context) {
		throw new Error("useNFC must be used within an NFCProvider");
	}
	return context;
};

export const NFCProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const NFC_ALIAS = "tagAlias";
	const NFC_TAGS_KEY = "nfcTags";
	const NFC_TAGS_HISTORY_KEY = "nfcHistory";
	const [abortController, setAbortController] = useState<AbortController | null>(null);
	const [supported, setSupported] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [tags, setTags] = useState<Tag[]>(() => {
		const storedTags = localStorage.getItem(NFC_TAGS_KEY);
		return storedTags ? JSON.parse(storedTags) : [];
	});
	const [history, setHistory] = useState<Tag[]>(() => {
		const storedHistory = localStorage.getItem(NFC_TAGS_HISTORY_KEY);
		return storedHistory ? JSON.parse(storedHistory) : [];
	});
	const { getNDEFRecordType, getNDEFMediaType, getRecordTypeFromNDEFRecordType } = useMapper();

	useEffect(() => {
		if ("NDEFReader" in window) {
			setSupported(true);
		} else {
			setErrorMessage("Device not supported");
		}
	}, []);

	const appendTag = (tag: Tag) => {
		setTags((prevTags) => {
			const existingTagIndex = prevTags.findIndex((t) => t.serialNumber === tag.serialNumber);
			let updatedTags;
			if (existingTagIndex !== -1) {
				updatedTags = [...prevTags];
				updatedTags[existingTagIndex] = tag;
			} else {
				updatedTags = [...prevTags, tag];
			}
			localStorage.setItem(NFC_TAGS_KEY, JSON.stringify(updatedTags));
			return updatedTags;
		});
	};

	const updateHistory = (tag: Tag) => {
		setHistory((prevHistory) => [...prevHistory, tag]);
		localStorage.setItem(NFC_TAGS_HISTORY_KEY, JSON.stringify([...history, tag]));
	};

	const removeTag = (serialNumber: string) => {
		setTags((prevTags) => {
			const updatedTags = prevTags.filter((tag) => tag.serialNumber !== serialNumber);
			localStorage.setItem(NFC_TAGS_KEY, JSON.stringify(updatedTags));
			return updatedTags;
		});
	};

	const setTagsFromData = (importedTags: Tag[]) => {
		setTags(importedTags);
		localStorage.setItem(NFC_TAGS_KEY, JSON.stringify(importedTags));
	};

	const setHistoryFromData = (importedHistory: Tag[]) => {
		setHistory(importedHistory);
		localStorage.setItem(NFC_TAGS_HISTORY_KEY, JSON.stringify(importedHistory));
	};

	const clearHistory = () => {
		setHistory([]);
		localStorage.removeItem(NFC_TAGS_HISTORY_KEY);
	};

	const getNameFromSerialNumber = (serialNumber: string) => {
		return tags.find((tag) => tag.serialNumber === serialNumber)?.name;
	};

	const abortAction = useCallback(() => {
		if (abortController) {
			abortController.abort();
			setAbortController(null);
		}
	}, [abortController]);

	const createNewAbortController = useCallback(() => {
		abortAction(); // Abort any existing operation
		const newController = new AbortController();
		setAbortController(newController);
		return newController;
	}, [abortAction]);

	const read = (save?: boolean): Promise<Tag | false> => {
		return new Promise((resolve) => {
			if (!supported) {
				resolve(false);
				return;
			}

			const newAbortController = createNewAbortController();
			setErrorMessage("");

			const ndef = new window.NDEFReader();
			ndef
				.scan({ signal: newAbortController.signal })
				.then(() => {
					ndef.onreading = (event: NDEFReadingEvent) => {
						if (newAbortController.signal.aborted) {
							ndef.onreading = () => {};
							resolve(false);
						} else {
							const { serialNumber, message } = event;
							const dataDecoded = decode(message.records as NDEFRecord[]);
							const named = save ? localStorage.getItem(NFC_ALIAS) : getNameFromSerialNumber(serialNumber);
							const ndefRead: Tag = {
								name: named || "Untitled",
								serialNumber,
								records: dataDecoded,
							};
							updateHistory(ndefRead);
							if (save) {
								appendTag(ndefRead);
							}
							localStorage.removeItem(NFC_ALIAS);
							resolve(ndefRead);
						}
					};
				})
				.catch((error) => {
					handleError(error);
					resolve(false);
				});
		});
	};

	const write = async (recordsDto: Record[]): Promise<boolean> => {
		if (!supported) {
			return false;
		}
		const newAbortController = createNewAbortController();
		setErrorMessage("");
		try {
			const ndef = new window.NDEFReader();
			const textEncoder = new TextEncoder();
			const records: NDEFRecord[] = (Array.isArray(recordsDto) ? recordsDto : [recordsDto]).map((recordDto) => {
				const record: NDEFRecord = {
					recordType: getNDEFRecordType(recordDto.type),
				};

				switch (record.recordType) {
					case NDEFRecordType.URI:
						record.data = encodeURI(recordDto.value);
						break;
					case NDEFRecordType.MIME_MEDIA:
						record.mediaType = getNDEFMediaType(recordDto.type);
						record.data = textEncoder.encode(recordDto.value);
						break;
					case NDEFRecordType.TEXT:
					case NDEFRecordType.SMART_POSTER:
					case NDEFRecordType.GENERIC:
						record.data = textEncoder.encode(recordDto.value);
						break;
					default:
						throw new Error(`Unsupported record type: ${record.recordType}`);
				}

				return record;
			});
			const content: NDEFMessage = { records };
			await ndef.write(content, { signal: newAbortController.signal });
			return true;
		} catch (error) {
			handleError(error);
			return false;
		}
	};

	const decode = (records: NDEFRecord[]): Record[] | undefined => {
		const textDecoder = new TextDecoder();
		const decodedRecords = records.map((record) => {
			const recordDto: Record = {
				type: getRecordTypeFromNDEFRecordType(record.recordType) || "QuickNote",
				value: textDecoder.decode(record.data as ArrayBuffer),
			};
			return recordDto;
		});
		return decodedRecords;
	};

	const handleError = (error: unknown) => {
		if (error instanceof Error) {
			if (error.name === "AbortError") {
				setErrorMessage("NFC operation aborted.");
			} else {
				setErrorMessage(`Error: ${error.message}`);
				toast.info(error.message);
			}
		} else {
			setErrorMessage("Unknown error occurred");
		}
	};

	const value: NFCContextType = {
		tags,
		history,
		errorMessage,
		supported,
		setTagsFromData,
		setHistoryFromData,
		appendTag,
		removeTag,
		read,
		write,
		abortAction,
		clearHistory,
	};

	return <NFCContext.Provider value={value}>{children}</NFCContext.Provider>;
};
