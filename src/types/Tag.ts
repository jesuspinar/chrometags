import { Record } from "./Record";

// DTO for NDEFReadingEvent
export interface Tag {
	name: string;
	serialNumber: string;
	records?: Record[];
}
