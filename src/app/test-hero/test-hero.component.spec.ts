import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeroComponent } from './test-hero.component';

describe('TestHeroComponent', () => {
  let component: TestHeroComponent;
  let fixture: ComponentFixture<TestHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
