import { TestBed } from '@angular/core/testing';
import { LoginModule } from './login.module';
describe('LoginModule', () => {
  let pipe: LoginModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LoginModule] });
    pipe = TestBed.get(LoginModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
