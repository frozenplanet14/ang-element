import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLazyComponent } from './one-lazy.component';

describe('OneLazyComponent', () => {
  let component: OneLazyComponent;
  let fixture: ComponentFixture<OneLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneLazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
