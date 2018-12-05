import { UploadPictureModule } from './upload-picture.module';

describe('UploadPictureModule', () => {
  let uploadPictureModule: UploadPictureModule;

  beforeEach(() => {
    uploadPictureModule = new UploadPictureModule();
  });

  it('should create an instance', () => {
    expect(uploadPictureModule).toBeTruthy();
  });
});
