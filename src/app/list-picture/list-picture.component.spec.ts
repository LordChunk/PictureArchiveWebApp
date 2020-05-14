import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { ListPictureComponent } from './list-picture.component';
describe('ListPictureComponent', () => {
  let component: ListPictureComponent;
  let fixture: ComponentFixture<ListPictureComponent>;
  beforeEach(() => {
    const pictureServiceStub = () => ({ getPictureRefs: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListPictureComponent],
      providers: [{ provide: PictureService, useFactory: pictureServiceStub }]
    });
    fixture = TestBed.createComponent(ListPictureComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const pictureServiceStub: PictureService = fixture.debugElement.injector.get(
        PictureService
      );
      spyOn(pictureServiceStub, 'getPictureRefs').and.callThrough();
      component.ngOnInit();
      expect(pictureServiceStub.getPictureRefs).toHaveBeenCalled();
    });
  });
});
