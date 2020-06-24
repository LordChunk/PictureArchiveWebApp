import { TestBed } from '@angular/core/testing';
import { NavfooterModule } from './navfooter.module';
describe('NavfooterModule', () => {
  let pipe: NavfooterModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NavfooterModule] });
    pipe = TestBed.inject(NavfooterModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
