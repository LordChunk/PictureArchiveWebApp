import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NAVITEMS } from '../../app-routing.module';
import { environment } from 'src/environments/environment';

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
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: no-unused-expression
    this.mobileQuery.addEventListener('change', (this.mobileQuery, null));
  }
}
