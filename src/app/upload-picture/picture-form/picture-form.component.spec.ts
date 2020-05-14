import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { PictureFormComponent } from './picture-form.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
describe('PictureFormComponent', () => {
  let component: PictureFormComponent;
  let fixture: ComponentFixture<PictureFormComponent>;
  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const matChipInputEventStub = () => ({ input: { value: {} }, value: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PictureFormComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        // { provide: MatChipInputEvent, useFactory: matChipInputEventStub },
      ],
    });
    fixture = TestBed.createComponent(PictureFormComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('separatorKeysCodes defaults to: [ENTER, COMMA]', () => {
    expect(component.separatorKeysCodes).toEqual([ENTER, COMMA]);
  });
  it('metaTags defaults to: []', () => {
    expect(component.metaTags).toEqual([]);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
        FormBuilder,
      );
      spyOn(component, 'formValueChangeEvent').and.callThrough();
      spyOn(formBuilderStub, 'group').and.callThrough();
      component.ngOnInit();
      expect(component.formValueChangeEvent).toHaveBeenCalled();
      expect(formBuilderStub.group).toHaveBeenCalled();
    });
  });
});
