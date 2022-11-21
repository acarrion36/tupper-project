import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavsmComponent } from './navsm.component';

describe('NavsmComponent', () => {
  let component: NavsmComponent;
  let fixture: ComponentFixture<NavsmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavsmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
