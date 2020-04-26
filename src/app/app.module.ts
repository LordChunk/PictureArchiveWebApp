import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
// import { AngularFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavfooterModule } from './navfooter/navfooter.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { UploadPictureModule } from './upload-picture/upload-picture.module';
import { ListPictureModule } from './list-picture/list-picture.module';

import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavfooterModule,
    DashboardModule,
    LoginModule,
    UploadPictureModule,
    HttpClientModule,
    ListPictureModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestore,
    AngularFireStorageModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: BUCKET, useValue: environment.firebase.storageBucket },
  ],
})
export class AppModule { }
