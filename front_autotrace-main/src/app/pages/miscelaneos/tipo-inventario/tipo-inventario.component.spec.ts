import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoInventarioComponent } from './tipo-inventario.component';

describe('TipoInventarioComponent', () => {
  let component: TipoInventarioComponent;
  let fixture: ComponentFixture<TipoInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
