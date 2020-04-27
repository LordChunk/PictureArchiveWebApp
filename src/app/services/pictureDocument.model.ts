export interface PictureDocument {
  uid: string;
  name: string;
  fileType: string;
  dateTaken: Date;
  dateUploaded: Date;
  metaTags: string[];
  downloadURL?: string;
}
