import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBankModalComponent } from './add-update-bank-modal.component';

describe('AddUpdateBankModalComponent', () => {
  let component: AddUpdateBankModalComponent;
  let fixture: ComponentFixture<AddUpdateBankModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateBankModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateBankModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
