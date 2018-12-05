import { Component, OnInit } from '@angular/core';
import { UploadPicturesService } from '../services/upload-pictures.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
})
export class UploadPictureComponent implements OnInit {

  constructor(private UploadService: UploadPicturesService) { }
  selectedFiles: FileList;

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFiles = event.target.files;
  }

  submitForm() {
    this.UploadService.upload(this.selectedFiles);
  }
}
