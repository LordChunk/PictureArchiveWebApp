export interface Picture {
  index: number;
  name: string;
  fileType: string;
  base64: string;
  dateTaken: Date;
  dateUploaded: Date;
  metaTags: string[];
}
