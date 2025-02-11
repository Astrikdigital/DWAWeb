import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositSlipModalComponent } from './deposit-slip-modal.component';

describe('DepositSlipModalComponent', () => {
  let component: DepositSlipModalComponent;
  let fixture: ComponentFixture<DepositSlipModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositSlipModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositSlipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
