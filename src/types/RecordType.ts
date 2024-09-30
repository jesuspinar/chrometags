import { NDEFMediaType, NDEFRecordType } from "./Nfc";

export type RecordType =
	| "QuickNote"
	| "WebsiteLink"
	| "BrowserSearch"
	| "SocialProfile"
	| "ContactInformation"
	| "Location"
	| "WifiCredentials";

export interface RecordTypeMap {
	QuickNote: NDEFRecordType.TEXT;
	WebsiteLink: NDEFRecordType.URI;
	BrowserSearch: NDEFRecordType.URI;
	SocialProfile: NDEFRecordType.URI;
	ContactInformation: NDEFRecordType.MIME_MEDIA;
	Location: NDEFRecordType.URI;
	WifiCredentials: NDEFRecordType.MIME_MEDIA;
}

export interface RecordTypeMediaMap {
	QuickNote: NDEFMediaType.PLAIN_TEXT;
	WebsiteLink: NDEFMediaType.URL;
	BrowserSearch: NDEFMediaType.URL;
	SocialProfile: NDEFMediaType.URL;
	ContactInformation: NDEFMediaType.VCARD;
	Location: NDEFMediaType.URL;
	WifiCredentials: NDEFMediaType.WIFI;
}
