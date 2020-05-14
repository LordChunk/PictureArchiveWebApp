import { Component, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NAVITEMS } from '../../app-routing.module';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  // Set as property so it can be used in html file
  navItems = NAVITEMS;
  // Import global vars
  appName = environment.appName;

  // Navigation JS stuff
  useNavigationInOverMode: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, @Inject(PLATFORM_ID) platformId) {
    let mobileQuery: MediaQueryList;
    if (isPlatformBrowser(platformId)) {
      mobileQuery = media.matchMedia('(max-width: 600px)');
      // tslint:disable-next-line: no-unused-expression
      mobileQuery.addEventListener('change', (mobileQuery, null));
    }

    if (mobileQuery !== undefined) {
      this.useNavigationInOverMode = mobileQuery.matches;
    } else {
      this.useNavigationInOverMode = false;
    }
  }
}
