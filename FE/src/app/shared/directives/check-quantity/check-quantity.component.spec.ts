import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckQuantityComponent } from './check-quantity.component';

describe('CheckQuantityComponent', () => {
  let component: CheckQuantityComponent;
  let fixture: ComponentFixture<CheckQuantityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckQuantityComponent]
    });
    fixture = TestBed.createComponent(CheckQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
