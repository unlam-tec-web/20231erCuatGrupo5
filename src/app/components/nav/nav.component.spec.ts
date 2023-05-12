import { ComponentFixture, TestBed } from '@angular/core/testing';

import { navComponent } from './nav.component';

describe('navComponent', () => {
  let component: navComponent;
  let fixture: ComponentFixture<navComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ navComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(navComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});