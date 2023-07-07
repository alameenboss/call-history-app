
export interface CallImportRecord {
  start: Date;
  title: string;
  phone?: string;
  callType?: string;
  durationT?: string;
  durationS?: string;
  callDate?: CallDateType[];
}



export interface CallDateType {
  date: Date;
  callType?: string;
  durationT?: string;
  durationS?: string;
}


export interface ContactType {
  name: string;
  number?: string;
  count?: number;
  checked: boolean;
}
