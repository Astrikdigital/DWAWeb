import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInventoryComponent } from './insert-inventory.component';

describe('InsertInventoryComponent', () => {
  let component: InsertInventoryComponent;
  let fixture: ComponentFixture<InsertInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
