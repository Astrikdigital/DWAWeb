import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCenterComposeComponent } from './help-center-compose.component';

describe('HelpCenterComposeComponent', () => {
  let component: HelpCenterComposeComponent;
  let fixture: ComponentFixture<HelpCenterComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpCenterComposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpCenterComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
