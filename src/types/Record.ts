import { RecordType } from "./RecordType";

// DTO for NDEFRecord
export interface Record {
	type: RecordType;
	value: string;
}
