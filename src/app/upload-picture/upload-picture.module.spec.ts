import { TestBed } from '@angular/core/testing';
import { UploadPictureModule } from './upload-picture.module';
import { UploadProgressComponent } from './upload-picture.component';
describe('UploadPictureModule', () => {
  let pipe: UploadPictureModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UploadPictureModule] });
    pipe = TestBed.inject(UploadPictureModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
