// Nfc.ts
export enum NDEFRecordType {
	TEXT = "text",
	URI = "url",
	SMART_POSTER = "smart-poster",
	GENERIC = "unknown",
	MIME_MEDIA = "mime",
	EXTERNAL = "external",
}

export enum NDEFMediaType {
	PLAIN_TEXT = "text/plain",
	URL = "text/uri-list",
	VCARD = "text/vcard",
	SMART_POSTER = "application/vnd.nfc.smartposter",
	WIFI = "application/vnd.wfa.wsc",
	BINARY = "application/octet-stream",

	JSON = "application/json",
	PDF = "application/pdf",
	PNG = "image/png",
	JPEG = "image/jpeg",
	HTML = "text/html",
	XML = "application/xml",
	CSV = "text/csv",
}

// ISO 639-1
export enum NDEFLanguage {
	ENGLISH = "en",
	SPANISH = "es",
	FRENCH = "fr",
	GERMAN = "de",
	ITALIAN = "it",
	CHINESE = "zh",
	JAPANESE = "ja",
	PORTUGUESE = "pt",
	RUSSIAN = "ru",
	ARABIC = "ar",
	KOREAN = "ko",
	DUTCH = "nl",
	HINDI = "hi",
	BENGALI = "bn",
}

export enum NDEFEncoding {
	UTF8 = "UTF-8",
	UTF16 = "UTF-16",
}

export interface NDEFRecord {
	recordType: NDEFRecordType;
	mediaType?: NDEFMediaType;
	id?: string;
	data?: ArrayBuffer | string;
	encoding?: NDEFEncoding;
	lang?: NDEFLanguage;
}

export interface NDEFMessage {
	records: NDEFRecord[];
}

export interface NDEFReadingEvent extends Event {
	serialNumber: string;
	message: NDEFMessage;
}

export interface NDEFReadOptions {
	signal?: AbortSignal;
}

export interface NDEFWriteOptions {
	signal?: AbortSignal;
}

export interface NDEFReader {
	scan: (options?: NDEFReadOptions) => Promise<void>;
	write: (message: NDEFMessage, options?: NDEFWriteOptions) => Promise<void>;
	onreading: (event: NDEFReadingEvent) => void;
}

declare global {
	interface Window {
		NDEFReader: {
			new (): NDEFReader;
		};
	}
}
