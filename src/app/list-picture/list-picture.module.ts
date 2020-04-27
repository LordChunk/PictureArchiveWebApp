import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPictureComponent } from './list-picture.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '../material/material.module';
import { PictureFrameComponent } from './picture-frame/picture-frame.component';

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    MaterialModule,
  ],
  declarations: [ListPictureComponent, PictureFrameComponent],
})
export class ListPictureModule { }
