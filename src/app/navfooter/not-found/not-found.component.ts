import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {

  public isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Platform) { }

  ngOnInit() {
    if(isPlatformServer(this.platformId)) {
      this.isServer = true;
    } else {
      this.isServer = false;
    }
  }

}
