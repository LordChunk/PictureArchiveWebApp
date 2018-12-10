import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadPictureComponent, UploadProgressComponent } from './upload-picture.component';
import { MaterialModule } from '../material/material.module';
import { PictureFormComponent } from './picture-form/picture-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UploadPictureComponent,
    UploadProgressComponent,
    PictureFormComponent,
  ],
  entryComponents: [
    UploadProgressComponent,
  ],
})
export class UploadPictureModule { }
