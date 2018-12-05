import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PictureService {

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
