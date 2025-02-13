import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateHeadModalComponent } from './add-update-head-modal.component';

describe('AddUpdateHeadModalComponent', () => {
  let component: AddUpdateHeadModalComponent;
  let fixture: ComponentFixture<AddUpdateHeadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateHeadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateHeadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
