import { Component, OnInit, Inject } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material';
import { map, share } from 'rxjs/operators';
import { HttpUploadProgressEvent } from '@angular/common/http/src/response';

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
    // Upload picture and save progress to observable
    const uploadProgress = this.pictureService.upload(this.selectedFiles).pipe(share());

    // Create snackbar with observable for progress bar
    this.snackBar.openFromComponent(UploadProgressComponent, {
      data: { uploadProgress },
    });

    // Wait for uploading to be finished and then clear selected files and preview URLs
    uploadProgress.subscribe((event: HttpUploadProgressEvent) => {
      if (event.loaded === event.total && event.loaded !== undefined) {
        this.selectedFiles = null;
        this.previewUrls = [];
      }
    });
  }

  // Convert file into Base64 string
  preview(file): string {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return 'Only images are supported.';
    }

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();

    // Activate reader
    reader.readAsDataURL(file);

    reader.onload = () => {
      // Put strings into array
      this.previewUrls.push(reader.result.toString());
    };
  }
}

@Component({
  selector: 'app-upload-progress-snackbar',
  template: `
  Progress:
  <mat-progress-bar mode="determinate" [value]="progress | async" *ngIf="progress !== undefined"></mat-progress-bar>`,
  styles: [`mat-progress-bar { margin-top: 5px;}`],
})
export class UploadProgressComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data,
    private _snackRef: MatSnackBarRef<UploadProgressComponent>,
    ) { }

  private started = false;

  // Save progress percentage as variable
  public progress = this.data.uploadProgress.pipe(
    map(({ loaded, total }) => {

      // Chronological if statement
      if (loaded === undefined && !this.started) {
        // Uploading hasn't started so return 0 progress
        return 0;
      // tslint:disable-next-line:no-else-after-return
      } else if (loaded !== undefined) {
        // Uploading has started
        this.started = true;

        // Convert progress to percentage and then to an integer
        return Math.round(loaded / (total || loaded) * 100);
      } else {

        // Uploading has finished
        // Destroying element
        this._snackRef.dismiss();
      }
    },
  ));
}
