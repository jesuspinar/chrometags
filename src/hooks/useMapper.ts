import { NDEFMediaType, NDEFRecordType } from "../types/Nfc";
import { RecordType, RecordTypeMap, RecordTypeMediaMap } from "../types/RecordType";

const useMapper = () => {
	//Available maps
	const recordTypeMap: RecordTypeMap = {
		QuickNote: NDEFRecordType.TEXT,
		WebsiteLink: NDEFRecordType.URI,
		BrowserSearch: NDEFRecordType.URI,
		SocialProfile: NDEFRecordType.URI,
		ContactInformation: NDEFRecordType.MIME_MEDIA,
		Location: NDEFRecordType.URI,
		WifiCredentials: NDEFRecordType.MIME_MEDIA,
	};

	const recordTypeMediaMap: RecordTypeMediaMap = {
		QuickNote: NDEFMediaType.PLAIN_TEXT,
		WebsiteLink: NDEFMediaType.URL,
		BrowserSearch: NDEFMediaType.URL,
		SocialProfile: NDEFMediaType.URL,
		ContactInformation: NDEFMediaType.VCARD,
		Location: NDEFMediaType.URL,
		WifiCredentials: NDEFMediaType.WIFI,
	};

	/**
	 * Function that returns the NDEFRecordType based on RecordType
	 * @param recordType RecordType
	 * @returns NDEFRecordType
	 */
	const getNDEFRecordType = (recordType: RecordType): NDEFRecordType => recordTypeMap[recordType];
	/**
	 * Function that returns the NDEFMediaType based on RecordType
	 * @param recordType RecordType
	 * @returns NDEFMediaType
	 */
	const getNDEFMediaType = (recordType: RecordType): NDEFMediaType => recordTypeMediaMap[recordType];

	/**
	 * Function that returns the RecordType based on NDEFRecordType
	 * @param ndefRecordType NDEFRecordType
	 * @returns RecordType | undefined
	 */
	const getRecordTypeFromNDEFRecordType = (ndefRecordType: NDEFRecordType): RecordType | undefined => {
		return Object.entries(recordTypeMap).find(([, value]) => value === ndefRecordType)?.[0] as RecordType | undefined;
	};

	/**
	 * Function that returns the RecordType based on NDEFMediaType
	 * @param ndefMediaType NDEFMediaType
	 * @returns RecordType | undefined
	 */
	const getRecordTypeFromNDEFMediaType = (ndefMediaType: NDEFMediaType): RecordType | undefined => {
		return Object.entries(recordTypeMediaMap).find(([, value]) => value === ndefMediaType)?.[0] as
			| RecordType
			| undefined;
	};

	return {
		getNDEFRecordType,
		getNDEFMediaType,
		getRecordTypeFromNDEFRecordType,
		getRecordTypeFromNDEFMediaType,
	};
};

export default useMapper;
