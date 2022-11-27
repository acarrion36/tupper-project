import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarFormularioComponent } from './donar-formulario.component';

describe('DonarFormularioComponent', () => {
  let component: DonarFormularioComponent;
  let fixture: ComponentFixture<DonarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
