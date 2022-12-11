import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PintaalergenosComponent } from './pintaalergenos.component';

describe('PintaalergenosComponent', () => {
  let component: PintaalergenosComponent;
  let fixture: ComponentFixture<PintaalergenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PintaalergenosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PintaalergenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
