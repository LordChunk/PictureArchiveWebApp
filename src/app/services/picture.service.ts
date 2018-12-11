import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpUploadProgressEvent } from '@angular/common/http/src/response';
import { Picture } from '../upload-picture/picture';

@Injectable({
  providedIn: 'root',
})
export class PictureService {

  constructor(private http: HttpClient) { }

  public upload(files: Picture[]): Observable<HttpEvent<HttpUploadProgressEvent>> {

    console.log(JSON.stringify(files));

    return this.http.post<any>(`${environment.apiUri}/picture/upload`, JSON.stringify(files), {
      reportProgress: true,
      observe: 'events',
    }).pipe();
  }

  public getPictureRefs(amount?: number, offset: number = 0): Observable<string[]> {
    // Request data and return as observable
    return this.http.get<string[]>(`${environment.apiUri}/picture/?amount=${amount}&offset=${offset}`).pipe();
  }
}
