import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../material/material.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  exports: [
    NavComponent,
    FooterComponent,
  ],
})
export class NavfooterModule { }
