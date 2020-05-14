import { TestBed } from '@angular/core/testing';
import { ListPictureModule } from './list-picture.module';
describe('ListPictureModule', () => {
  let pipe: ListPictureModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ListPictureModule] });
    pipe = TestBed.get(ListPictureModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
