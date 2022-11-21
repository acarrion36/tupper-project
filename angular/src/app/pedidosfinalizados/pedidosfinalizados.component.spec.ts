import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosfinalizadosComponent } from './pedidosfinalizados.component';

describe('PedidosfinalizadosComponent', () => {
  let component: PedidosfinalizadosComponent;
  let fixture: ComponentFixture<PedidosfinalizadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosfinalizadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosfinalizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
