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
      return 'Only images are supported.';
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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-progress-snackbar',
  template: `
  Progress:
  <mat-progress-bar mode="determinate" [value]="progress | async" *ngIf="progress !== undefined"></mat-progress-bar>`,
  styles: [`mat-progress-bar { margin-top: 5px;}`],
})
export class UploadProgressComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) { }

  private started = false;
  public progress = this.data.uploadProgress.pipe(
    map(({ loaded, total }) => {
      if (loaded === undefined) {
        return !this.started ? 0 : 100;
      // tslint:disable-next-line:no-else-after-return
      } else {
        this.started = true;
        return Math.round(loaded / (total || loaded) * 100);
      }
    },
  ));
}
