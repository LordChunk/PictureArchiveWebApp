import { TestBed } from '@angular/core/testing';
import { DashboardModule } from './dashboard.module';
describe('DashboardModule', () => {
  let pipe: DashboardModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DashboardModule] });
    pipe = TestBed.inject(DashboardModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
