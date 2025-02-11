import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBankDepositSlipComponent } from './all-bank-deposit-slip.component';

describe('AllBankDepositSlipComponent', () => {
  let component: AllBankDepositSlipComponent;
  let fixture: ComponentFixture<AllBankDepositSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllBankDepositSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBankDepositSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
