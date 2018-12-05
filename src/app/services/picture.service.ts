import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PictureService {

  constructor(private http: HttpClient) { }

  public upload(files: FileList) {
    const uploadData = new FormData();

    let i = 0;
    Array.from(files).forEach((file) => {
      uploadData.append(i.toString(), file);
      i += 1;
    });

    console.log(this.upload);

    this.http.post(`${environment.apiUri}/picture/upload`, uploadData, {
      reportProgress: true,
      observe: 'events',
    })
      .subscribe((event) => {
        console.log(event); // handle event here
      });
  }

  public getPictureRefs(amount?: number): Observable<object> {
    let reqNumbers: number;

    // Check for valid data
    if (amount <= 0 || amount > 100) {
      reqNumbers = 10;
    } else {
      reqNumbers = amount;
    }

    // Request data and return as observable
    return this.http.get(`${environment.apiUri}/picture/${reqNumbers}`).pipe();
  }
}
