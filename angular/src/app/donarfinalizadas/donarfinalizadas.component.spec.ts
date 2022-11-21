import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarfinalizadasComponent } from './donarfinalizadas.component';

describe('DonarfinalizadasComponent', () => {
  let component: DonarfinalizadasComponent;
  let fixture: ComponentFixture<DonarfinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarfinalizadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonarfinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
