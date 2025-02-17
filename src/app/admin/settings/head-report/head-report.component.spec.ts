import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadReportComponent } from './head-report.component';

describe('HeadReportComponent', () => {
  let component: HeadReportComponent;
  let fixture: ComponentFixture<HeadReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
