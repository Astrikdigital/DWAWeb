import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProjectModalComponent } from './add-update-project-modal.component';

describe('AddUpdateProjectModalComponent', () => {
  let component: AddUpdateProjectModalComponent;
  let fixture: ComponentFixture<AddUpdateProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateProjectModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
