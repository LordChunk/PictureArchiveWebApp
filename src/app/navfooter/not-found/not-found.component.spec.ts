import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { NotFoundComponent } from './not-found.component';
describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  beforeEach(() => {
    const platformStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotFoundComponent],
      providers: [{ provide: Platform, useFactory: platformStub }]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
