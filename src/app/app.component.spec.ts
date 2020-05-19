import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(() => {
    const swUpdateStub = () => ({
      isEnabled: {},
      available: { subscribe: f => f({}) },
      checkForUpdate: () => ({ then: () => ({ catch: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppComponent],
      providers: [{ provide: SwUpdate, useFactory: swUpdateStub }]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const swUpdateStub: SwUpdate = fixture.debugElement.injector.get(
        SwUpdate,
      );
      spyOn(swUpdateStub, 'checkForUpdate').and.callThrough();
      component.ngOnInit();
      expect(swUpdateStub.checkForUpdate).toHaveBeenCalled();
    });
  });
});
