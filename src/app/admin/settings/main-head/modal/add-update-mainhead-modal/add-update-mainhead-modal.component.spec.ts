import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMainheadModalComponent } from './add-update-mainhead-modal.component';

describe('AddUpdateMainheadModalComponent', () => {
  let component: AddUpdateMainheadModalComponent;
  let fixture: ComponentFixture<AddUpdateMainheadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateMainheadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateMainheadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
