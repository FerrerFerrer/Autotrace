import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarPlacardComponent } from './descargar-placard.component';

describe('DescargarPlacardComponent', () => {
  let component: DescargarPlacardComponent;
  let fixture: ComponentFixture<DescargarPlacardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarPlacardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarPlacardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
