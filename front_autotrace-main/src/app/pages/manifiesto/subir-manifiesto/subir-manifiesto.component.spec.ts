import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirManifiestoComponent } from './subir-manifiesto.component';

describe('SubirManifiestoComponent', () => {
  let component: SubirManifiestoComponent;
  let fixture: ComponentFixture<SubirManifiestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirManifiestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirManifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
