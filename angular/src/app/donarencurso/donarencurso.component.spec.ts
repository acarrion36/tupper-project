import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarencursoComponent } from './donarencurso.component';

describe('DonarencursoComponent', () => {
  let component: DonarencursoComponent;
  let fixture: ComponentFixture<DonarencursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonarencursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonarencursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
