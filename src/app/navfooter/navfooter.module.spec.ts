import { NavfooterModule } from './navfooter.module';

describe('NavfooterModule', () => {
  let navfooterModule: NavfooterModule;

  beforeEach(() => {
    navfooterModule = new NavfooterModule();
  });

  it('should create an instance', () => {
    expect(navfooterModule).toBeTruthy();
  });
});
