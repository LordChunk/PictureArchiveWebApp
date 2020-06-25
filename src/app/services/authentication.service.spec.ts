import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './authentication.service';
describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    const angularFireAuthStub = () => ({
      authState: {
        subscribe: f => f({}),
        pipe: () => ({ toPromise: () => ({}) }),
      },
      signInWithEmailAndPassword: (email, password) => ({}),
      createUserWithEmailAndPassword: (email, password) => ({}),
      signOut: () => ({}),
    });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useFactory: angularFireAuthStub },
      ],
    });
    service = TestBed.inject(AuthService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const angularFireAuthStub: AngularFireAuth = TestBed.inject(AngularFireAuth);
      spyOn(angularFireAuthStub, 'signOut').and.callThrough();
      service.logout();
      expect(angularFireAuthStub.signOut).toHaveBeenCalled();
    });
  });
});
