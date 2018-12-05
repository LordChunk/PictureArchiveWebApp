import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPictureComponent } from './upload-picture.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    UploadPictureComponent,
  ],
})
export class UploadPictureModule { }
