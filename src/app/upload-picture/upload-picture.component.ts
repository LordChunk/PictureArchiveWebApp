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

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files;
  }

  submitForm() {
    this.pictureService.upload(this.selectedFiles);
  }
}
