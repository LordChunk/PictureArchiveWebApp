import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Picture } from '../picture';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.scss'],
})
export class PictureFormComponent implements OnInit {

  @Input() picture: Picture;

  @Output() pictureValueChange = new EventEmitter();

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  metaTags: string[] = [];
  pictureForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pictureForm = this.fb.group({
      index: [],
      base64: [],
      name: [],
      metaTags: [],
      date: [],
      // destroyed: [false],
    });

    // console.log(this.picture);
    const pControls = this.pictureForm.controls;
    pControls['index'].setValue(this.picture.index);
    pControls['name'].setValue(this.picture.name);
    pControls['date'].setValue(this.picture.date);
    pControls['base64'].setValue(this.picture.base64);

    // Emit original create event
    // this.pictureValueChange.emit(this.pictureForm.value);

    // Create value change subscriber
    this.formValueChangeEvent();
  }

  formValueChangeEvent(): void {
    this.pictureForm.valueChanges.subscribe((val) => {
      // console.log(val);
      this.pictureValueChange.emit(val);
    });
  }

  // ngOnDestroy(): void {
  //   this.pictureForm.controls['destroyed'].setValue(true);
  //   this.formValueChangeEvent();
  // }

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
