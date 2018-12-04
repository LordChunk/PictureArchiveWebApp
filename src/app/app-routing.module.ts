import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
];

export const NAVITEMS: NavItem[] = [
  // { name: 'home', path: '', icon: 'home' },
  { name: 'login', path: 'login', icon: 'person_add' },
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
