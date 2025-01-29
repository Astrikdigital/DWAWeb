import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterQueriesComponent } from './help-center-queries.component';

describe('HelpCenterQueriesComponent', () => {
  let component: HelpCenterQueriesComponent;
  let fixture: ComponentFixture<HelpCenterQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpCenterQueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpCenterQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
