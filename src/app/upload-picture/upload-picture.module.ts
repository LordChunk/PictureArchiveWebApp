import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPictureComponent, UploadProgressComponent } from './upload-picture.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    UploadPictureComponent,
    UploadProgressComponent,
  ],
  entryComponents: [
    UploadProgressComponent,
  ],
})
export class UploadPictureModule { }
