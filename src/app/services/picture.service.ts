import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Picture } from '../models/picture.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { PictureDocument } from './pictureDocument.model';
import { AuthService } from './authentication.service';

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
    pictures.forEach(({ name, index, fileType, base64, dateTaken, dateUploaded, metaTags }: Picture) => {
      console.log(fileType);
      const fileExtension = fileType.split('/').pop();
      const rawBase64 = base64.split(';base64,').pop();
      const uid = this.afs.createId();

      const pictureDocument: PictureDocument = {
        uid,
        name,
        fileType,
        dateTaken,
        dateUploaded,
        metaTags,
      };

      const uploadTask = this.storage.ref(`picture/${uid}.${fileExtension}`)
        .putString(rawBase64, 'base64', { contentType: `${fileType}` });

      // update percentages
      uploadTask.percentageChanges().subscribe(
        (newPercentage) => {
          const currentValues = allPercentages.getValue();
          currentValues[index] = newPercentage;
          allPercentages.next(currentValues);
        },
        () => {

        },
        // Only add document on upload completion
        () => {
          pictureCollection.doc(uid).set(pictureDocument)
          .then(() => {
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

  public getPictureRefs(amount?: number, offset: number = 0): Observable<PictureDocument[]> {
    const pictureCollection = this.afs.collection<PictureDocument>(
      'picture',
      (ref) => {
        return ref.orderBy('dateUploaded', 'desc').orderBy('uid', 'asc');
      });

    return pictureCollection.valueChanges();
  }

  public downloadPicture(refId: string, fileType: string): Observable<string> {
    const fileExtension = fileType.split('/').pop();

    return this.storage.ref(`picture/${refId}.${fileExtension}`).getDownloadURL();
  }
}
