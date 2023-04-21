import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito57Component } from './digito57.component';

describe('Digito57Component', () => {
  let component: Digito57Component;
  let fixture: ComponentFixture<Digito57Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito57Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito57Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
