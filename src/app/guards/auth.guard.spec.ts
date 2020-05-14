import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
  let service: AuthGuard;
  beforeEach(() => {
    const activatedRouteSnapshotStub = () => ({});
    const routerStateSnapshotStub = () => ({});
    const routerStub = () => ({ navigate: (array, object) => ({}) });
    const authServiceStub = () => ({ user: { pipe: () => ({}) } });
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: ActivatedRouteSnapshot,
          useFactory: activatedRouteSnapshotStub
        },
        { provide: RouterStateSnapshot, useFactory: routerStateSnapshotStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.get(AuthGuard);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = TestBed.get(
        ActivatedRouteSnapshot
      );
      const routerStateSnapshotStub: RouterStateSnapshot = TestBed.get(
        RouterStateSnapshot
      );
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
