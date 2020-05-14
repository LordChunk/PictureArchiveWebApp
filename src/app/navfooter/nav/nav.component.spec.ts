import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NAVITEMS } from '../../app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { environment } from 'src/environments/environment';
describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavComponent],
      providers: [],
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('navItems defaults to: NAVITEMS', () => {
    expect(component.navItems).toEqual(NAVITEMS);
  });
  it('appName defaults to: environment.appName', () => {
    expect(component.appName).toEqual(environment.appName);
  });
});
