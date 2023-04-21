import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoPaginaComponent } from './encabezado-pagina.component';

describe('EncabezadoPaginaComponent', () => {
  let component: EncabezadoPaginaComponent;
  let fixture: ComponentFixture<EncabezadoPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncabezadoPaginaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncabezadoPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
