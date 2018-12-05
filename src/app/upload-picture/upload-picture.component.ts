import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
})
export class UploadPictureComponent implements OnInit {

  constructor(private pictureService: PictureService) { }
  selectedFiles: FileList;
  previewUrls: string[] = [];

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files;

    this.previewUrls = [];

    Array.from(this.selectedFiles)
      .forEach((file) => {
        (this.preview(file));
      });
  }

  submitForm() {
    this.pictureService.upload(this.selectedFiles);
  }

  preview(file): string {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return  'Only images are supported.';
    }

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.previewUrls.push(reader.result.toString());
    };
  }
}
