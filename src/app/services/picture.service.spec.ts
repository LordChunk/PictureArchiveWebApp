import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { PictureService } from './picture.service';
describe('PictureService', () => {
  let service: PictureService;
  beforeEach(() => {
    const angularFirestoreStub = () => ({
      collection: string => ({
        doc: () => ({ set: () => ({ then: () => ({}) }) }),
        valueChanges: () => ({}),
      }),
      createId: () => ({}),
    });
    const angularFireStorageStub = () => ({
      ref: arg => ({
        putString: () => ({
          percentageChanges: () => ({ subscribe: f => f({}) }),
        }),
        getDownloadURL: () => ({}),
      }),
    });
    TestBed.configureTestingModule({
      providers: [
        PictureService,
        { provide: AngularFirestore, useFactory: angularFirestoreStub },
        { provide: AngularFireStorage, useFactory: angularFireStorageStub },
      ],
    });
    service = TestBed.inject(PictureService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
