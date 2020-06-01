import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { Picture } from '../models/picture.model';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { UploadPictureComponent, UploadProgressComponent } from './upload-picture.component';
import { of } from 'rxjs';

describe('UploadPictureComponent', () => {
  let component: UploadPictureComponent;
  let fixture: ComponentFixture<UploadPictureComponent>;
  beforeEach(() => {
    const pictureServiceStub = () => ({
      upload: uploadablePictures => ({
        pipe: () => ({ subscribe: f => f({}) }),
      }),
    });
    const matSnackBarStub = () => ({
      openFromComponent: (uploadProgressComponent, object) => ({}),
    });
    const matSnackBarRefStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UploadPictureComponent, UploadProgressComponent],
      providers: [
        { provide: PictureService, useFactory: pictureServiceStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: MatSnackBarRef, useFactory: matSnackBarRefStub },
      ],
    });
    fixture = TestBed.createComponent(UploadPictureComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('Pictures defaults to: []', () => {
    expect(component.Pictures).toEqual([]);
  });
  it('UploadablePictures defaults to: []', () => {
    expect(component.UploadablePictures).toEqual([]);
  });
  describe('uploadImages', () => {
    it('makes expected calls', () => {
      const pictureServiceStub: PictureService = fixture.debugElement.injector.get(
        PictureService,
      );
      const matSnackBarStub: MatSnackBar = fixture.debugElement.injector.get(
        MatSnackBar,
      );
      spyOn(pictureServiceStub, 'upload').and.callThrough();
      spyOn(matSnackBarStub, 'openFromComponent').and.callThrough();
      component.uploadImages();
      expect(pictureServiceStub.upload).toHaveBeenCalled();
      expect(matSnackBarStub.openFromComponent).toHaveBeenCalled();
    });
  });
});
describe('UploadProgressComponent', () => {
  let component: UploadProgressComponent;
  let fixture: ComponentFixture<UploadProgressComponent>;
  beforeEach(() => {
    const pictureServiceStub = () => ({
      upload: uploadablePictures => ({
        pipe: () => ({ subscribe: f => f({}) }),
      }),
    });
    const matSnackBarStub = () => ({
      openFromComponent: (uploadProgressComponent, object) => ({}),
    });
    const matSnackBarRefStub = () => ({ dismiss: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UploadPictureComponent, UploadProgressComponent],
      providers: [
        { provide: PictureService, useFactory: pictureServiceStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
        { provide: MatSnackBarRef, useFactory: matSnackBarRefStub },
        { provide: MAT_SNACK_BAR_DATA, useValue: { uploadTask: of(100) } },
      ],
    });
    fixture = TestBed.createComponent(UploadProgressComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const matSnackBarRefStub: MatSnackBarRef<any> = fixture.debugElement.injector.get(
        MatSnackBarRef,
      );
      spyOn(matSnackBarRefStub, 'dismiss').and.callThrough();
      component.ngOnInit();
      expect(matSnackBarRefStub.dismiss).toHaveBeenCalled();
    });
  });
});
