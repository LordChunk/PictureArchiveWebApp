import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PictureFormComponent } from './picture-form.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
describe('PictureFormComponent', () => {
  let component: PictureFormComponent;
  let fixture: ComponentFixture<PictureFormComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PictureFormComponent],
      providers: [
        { provide: FormBuilder },
      ],
    });
    fixture = TestBed.createComponent(PictureFormComponent);
    component = fixture.componentInstance;

    component.picture = {
      base64: '',
      dateUploaded: new Date('2020-04-29T16:03:20.475Z'),
      dateTaken: new Date('2017-06-10T12:28:38Z'),
      fileType: 'image/jpeg',
      index: 1,
      metaTags: ['none', 'and some'],
      name: 'test name',
    };
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
