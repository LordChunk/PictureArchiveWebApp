import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';
import { ListPictureComponent } from './list-picture/list-picture.component';
import { NotFoundComponent } from './navfooter/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: UploadPictureComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'view', component: ListPictureComponent, canActivate: [AngularFireAuthGuard] },
  { path: '**', component: NotFoundComponent },
];

export const NAVITEMS: NavItem[] = [
  { name: 'login', path: 'login', icon: 'person_add' },
  { name: 'Upload Pictures', path: 'upload', icon: 'publish' },
  { name: 'View Pictures', path: 'view', icon: 'view_list' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
  ],

  exports: [RouterModule],
})
export class AppRoutingModule { }

interface NavItem {
  name: string;
  path: string;
  icon: string;
}
