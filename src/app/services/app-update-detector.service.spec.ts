import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUpdateDetectorService } from './app-update-detector.service';

describe('AppUpdateDetectorService', () => {
  let service: AppUpdateDetectorService;
  beforeEach(() => {
    const swUpdateStub = () => ({
      activateUpdate: () => ({}),
      available: { subscribe: f => f({}) },
    });
    const matSnackBarStub = () => ({
      open: (string, string1, object) => ({
        onAction: () => ({ subscribe: f => f({}) }),
      }),
    });
    TestBed.configureTestingModule({
      providers: [
        AppUpdateDetectorService,
        { provide: SwUpdate, useFactory: swUpdateStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub },
      ],
    });
    service = TestBed.inject(AppUpdateDetectorService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
