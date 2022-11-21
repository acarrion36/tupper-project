import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosrecogidosComponent } from './pedidosrecogidos.component';

describe('PedidosrecogidosComponent', () => {
  let component: PedidosrecogidosComponent;
  let fixture: ComponentFixture<PedidosrecogidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosrecogidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosrecogidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
