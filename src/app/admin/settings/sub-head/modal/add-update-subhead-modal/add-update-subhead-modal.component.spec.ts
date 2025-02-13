import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubheadModalComponent } from './add-update-subhead-modal.component';

describe('AddUpdateSubheadModalComponent', () => {
  let component: AddUpdateSubheadModalComponent;
  let fixture: ComponentFixture<AddUpdateSubheadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateSubheadModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateSubheadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
