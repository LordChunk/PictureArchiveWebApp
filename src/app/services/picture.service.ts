import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Picture } from '../models/picture.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PictureService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

  public upload(pictures: Picture[]): Observable<number> {
    const uploadProgress = of(0);

    const pictureCollection = this.afs.collection<Picture>('picture');
    pictures.forEach((picture) => {
      const fileExtension = picture.fileType.split('/').pop();
      const rawBase64 = picture.base64.split(';base64,').pop();

      pictureCollection.add(picture)
        .then((ref) => {
          this.storage.ref(`picture/${ref.id}.${fileExtension}`)
            .putString(rawBase64, 'base64', { contentType: `${picture.fileType}` });
        });
    });

    return uploadProgress;
  }

  public getPictureRefs(amount?: number, offset: number = 0)/*: Observable<string[]>*/ {
    return of([]);
    // Request data and return as observable
    // return this.http.get<string[]>(`${environment.apiUri}/picture/?amount=${amount}&offset=${offset}`).pipe();
  }
}
