import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss'],
})
export class PictureFormComponent implements OnInit {

  @Input() index: string;
  @Input() pictureBase64: string;
  // @Input() rawPicture: File;

  @Output() pictureValueChange = new EventEmitter();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  metaTags: string[] = [];

  pictureForm = this.fb.group({
    index: [],
    picture: [],
    name: [],
    metaTags: [],
    datePictureTaken: [],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pictureForm.controls['index'].setValue(this.index);
    // this.pictureForm.controls['picture'].setValue(this.pictureBase64);
  }

  pictureValueChanged() {
    this.pictureValueChange.emit(JSON.stringify(this.pictureForm.value));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our meta tag
    if ((value || '').trim()) {
      this.metaTags.push(value);

      this.pictureForm.controls['metaTags'].setValue(this.metaTags);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  // remove meta tag
  remove(value: string): void {
    const index = this.metaTags.indexOf(value);

    if (index >= 0) {
      this.metaTags.splice(index, 1);

      this.pictureForm.controls['metaTags'].setValue(this.metaTags);
    }
  }
}
