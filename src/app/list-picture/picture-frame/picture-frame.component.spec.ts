import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PictureService } from 'src/app/services/picture.service';
import { PictureFrameComponent } from './picture-frame.component';
describe('PictureFrameComponent', () => {
  let component: PictureFrameComponent;
  let fixture: ComponentFixture<PictureFrameComponent>;
  beforeEach(() => {
    const pictureServiceStub = () => ({
      downloadPicture: (uid, fileType) => ({}),
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PictureFrameComponent],
      providers: [{ provide: PictureService, useFactory: pictureServiceStub }],
    });
    fixture = TestBed.createComponent(PictureFrameComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnChanges', () => {
    it('makes expected calls', () => {
      const pictureServiceStub: PictureService = fixture.debugElement.injector.get(
        PictureService,
      );
      spyOn(pictureServiceStub, 'downloadPicture').and.callThrough();
      component.ngOnChanges();
      expect(pictureServiceStub.downloadPicture).toHaveBeenCalled();
    });
  });
});
