import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFixedComponent } from './social-fixed.component';

describe('SocialFixedComponent', () => {
  let component: SocialFixedComponent;
  let fixture: ComponentFixture<SocialFixedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialFixedComponent]
    });
    fixture = TestBed.createComponent(SocialFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
