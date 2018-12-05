import { ListPictureModule } from './list-picture.module';

describe('ListPictureModule', () => {
  let listPictureModule: ListPictureModule;

  beforeEach(() => {
    listPictureModule = new ListPictureModule();
  });

  it('should create an instance', () => {
    expect(listPictureModule).toBeTruthy();
  });
});
