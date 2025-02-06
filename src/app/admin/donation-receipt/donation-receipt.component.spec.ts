import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationReceiptComponent } from './donation-receipt.component';

describe('DonationReceiptComponent', () => {
  let component: DonationReceiptComponent;
  let fixture: ComponentFixture<DonationReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
