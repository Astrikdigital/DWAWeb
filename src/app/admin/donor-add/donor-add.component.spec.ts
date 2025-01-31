import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorAddComponent } from './donor-add.component';

describe('DonorAddComponent', () => {
  let component: DonorAddComponent;
  let fixture: ComponentFixture<DonorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
