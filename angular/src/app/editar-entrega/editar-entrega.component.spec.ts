import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntregaComponent } from './editar-entrega.component';

describe('EditarEntregaComponent', () => {
  let component: EditarEntregaComponent;
  let fixture: ComponentFixture<EditarEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
