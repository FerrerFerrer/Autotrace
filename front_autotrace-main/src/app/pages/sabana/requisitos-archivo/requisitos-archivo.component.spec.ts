import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosArchivoComponent } from './requisitos-archivo.component';

describe('RequisitosArchivoComponent', () => {
  let component: RequisitosArchivoComponent;
  let fixture: ComponentFixture<RequisitosArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequisitosArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitosArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
