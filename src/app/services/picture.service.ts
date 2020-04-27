import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Picture } from '../models/picture.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { PictureDocument } from './pictureDocument.model';

@Injectable({
  providedIn: 'root',
})
export class PictureService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    ) { }

  public upload(pictures: Picture[]): Observable<number> {
    const allPercentages = new BehaviorSubject([]);
    const averageProgress = new BehaviorSubject(0);

    const pictureCollection = this.afs.collection<PictureDocument>('picture');
    pictures.forEach(({ index, fileType, base64, dateTaken, dateUploaded, metaTags }: Picture) => {
      console.log(fileType);
      const fileExtension = fileType.split('/').pop();
      const rawBase64 = base64.split(';base64,').pop();

      const pictureDocument: PictureDocument = {
        fileType,
        dateTaken,
        dateUploaded,
        metaTags,
      };

      pictureCollection.add(pictureDocument)
        .then((ref) => {
          const uploadTask = this.storage.ref(`picture/${ref.id}.${fileExtension}`)
            .putString(rawBase64, 'base64', { contentType: `${fileType}` });

          // update percentages
          uploadTask.percentageChanges().subscribe(
            (newPercentage) => {
              const currentValues = allPercentages.getValue();
              currentValues[index] = newPercentage;
              allPercentages.next(currentValues);
            },
            // Delete reference on error
            () => {
              pictureCollection.doc(ref.id).delete();
            });
        });
    });

    allPercentages.subscribe((percentages) => {
      let totalSumOfPercentages = 0;
      percentages.forEach(percentage => totalSumOfPercentages = totalSumOfPercentages + percentage);

      averageProgress.next(totalSumOfPercentages / pictures.length + 1);
    });

    averageProgress.subscribe(console.log);

    return averageProgress;
  }

  public getPictureRefs(amount?: number, offset: number = 0)/*: Observable<string[]>*/ {
    return of([]);
    // Request data and return as observable
    // return this.http.get<string[]>(`${environment.apiUri}/picture/?amount=${amount}&offset=${offset}`).pipe();
  }
}
