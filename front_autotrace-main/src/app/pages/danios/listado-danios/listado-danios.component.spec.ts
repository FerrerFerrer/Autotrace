import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDaniosComponent } from './listado-danios.component';

describe('ListadoDaniosComponent', () => {
  let component: ListadoDaniosComponent;
  let fixture: ComponentFixture<ListadoDaniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoDaniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDaniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
