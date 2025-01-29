import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryComposeComponent } from './query-compose.component';

describe('QueryComposeComponent', () => {
  let component: QueryComposeComponent;
  let fixture: ComponentFixture<QueryComposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryComposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
