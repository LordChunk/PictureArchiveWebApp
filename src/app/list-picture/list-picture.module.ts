import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPictureComponent } from './list-picture.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    ScrollingModule,
    MaterialModule,
  ],
  declarations: [ListPictureComponent],
})
export class ListPictureModule { }
