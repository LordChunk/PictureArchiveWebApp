import { Component, OnInit, Inject } from '@angular/core';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
})
export class UploadPictureComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private snackBar: MatSnackBar,
    ) { }
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

  uploadImages() {
    const uploadProgress = this.pictureService.upload(this.selectedFiles);

    this.snackBar.openFromComponent(UploadProgressComponent, {
      data: { uploadProgress },
    });
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

import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-progress-snackbar',
  template: `<mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>`,
  styles: [],
})
export class UploadProgressComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) { }

  public UploadObservable;

  public progress = 0;
  ngOnInit() {
    this.UploadObservable = this.data.uploadProgress;

    this.UploadObservable.subscribe((event) => {
      // Don't change value after finished upload
      if (event.loaded !== undefined) {
        // Convert progress to percentage and integer
        this.progress = Math.trunc(event.loaded / (event.total || event.loaded) * 100);

        this.progress.valueOf();
      }
      // Log upload progress
      console.log(this.progress);
    });
  }
}
