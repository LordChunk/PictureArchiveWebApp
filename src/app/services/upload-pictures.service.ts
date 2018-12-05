import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadPicturesService {

  constructor(private http: HttpClient) { }

  public upload(files: FileList) {
    const uploadData = new FormData();

    Array.from(files).forEach((file) => {
      uploadData.append('image', file);
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
}
