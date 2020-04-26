import { Component, OnInit, Inject } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { map, share } from 'rxjs/operators';
import { Picture } from '../models/picture.model';
import { HttpUploadProgressEvent } from '@angular/common/http';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

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

  // List of pictures from orignal file input
  selectedFiles: FileList;
  // List of pictures to create components with
  Pictures: Picture[] = [];
  // List of picture data returned from components
  UploadablePictures: Picture[] = [];

  ngOnInit() {
  }

  // Event triggered by child components
  updatePictureList(event: Picture) {
    console.log(event);
    const pic = new Picture();
    pic.index = event.index;
    pic.base64 = event.base64;
    pic.name = event.name;
    pic.dateTaken = event.dateTaken;
    pic.metaTags = event.metaTags;

    this.UploadablePictures.splice(event.index, 1, pic);

    console.log(this.UploadablePictures);
  }

  onFileChanged(event) {
    // Get files
    this.selectedFiles = event.target.files;

    // Wipe arrays
    this.Pictures = [];
    this.UploadablePictures = [];

    // Set loop int
    let i = 0;
    Array.from(this.selectedFiles)
      .forEach((file) => {
        // Run preview and push to array
        this.preview(file, i);

        // Increase array length int
        i += 1;
      });
  }

  // Convert file into Base64 string
  preview(file: File, arrayLength: number): string {
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return 'Only images are supported.';
    }

    // tslint:disable-next-line:prefer-const
    let reader = new FileReader();

    // Activate reader
    reader.readAsDataURL(file);

    reader.onload = () => {
      const picture: Picture = {
        base64: reader.result.toString(),
        dateTaken: new Date(file.lastModified),
        dateUploaded: new Date(), // Might replace this with a server-side timestamp at some point
        index: arrayLength,
        name: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension with REGEX
        metaTags: [],
        fileType: file.type,
      };

      // Put class into array
      this.Pictures.push(picture);
      this.UploadablePictures.push(picture);
    };
  }

  uploadImages() {
    // // Upload picture and save progress to observable
    const uploadTask = this.pictureService.upload(this.UploadablePictures).pipe(share());

    // Create snackbar with observable for progress bar
    this.snackBar.openFromComponent(UploadProgressComponent, {
      data: { uploadTask },
    });

    // Wait for uploading to be finished and then clear selected files and preview URLs
    uploadTask.subscribe((uploadProgress) => {
      if (uploadProgress === 100) {
        this.selectedFiles = null;
        this.Pictures = [];
        this.UploadablePictures = [];
      }
    });
  }

}

@Component({
  selector: 'app-upload-progress-snackbar',
  template: `
  Progress:
  <mat-progress-bar mode="determinate" [value]="progress | async" *ngIf="progress !== undefined"></mat-progress-bar>`,
  styles: [`mat-progress-bar { margin-top: 5px;}`],
})
export class UploadProgressComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data,
    private _snackRef: MatSnackBarRef<UploadProgressComponent>,
  ) {
    this.progress = data.uploadTask;
  }
  public progress: Observable<number>;

  ngOnInit() {
    this.progress.subscribe(
      (value) => {
        if (value === 100) {
          this._snackRef.dismiss();
        }
      },
      () => {
        this._snackRef.dismiss();
      });
  }
}
