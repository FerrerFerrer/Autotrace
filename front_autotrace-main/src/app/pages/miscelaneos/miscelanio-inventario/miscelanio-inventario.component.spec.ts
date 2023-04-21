import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscelanioInventarioComponent } from './miscelanio-inventario.component';

describe('MiscelanioInventarioComponent', () => {
  let component: MiscelanioInventarioComponent;
  let fixture: ComponentFixture<MiscelanioInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscelanioInventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscelanioInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
