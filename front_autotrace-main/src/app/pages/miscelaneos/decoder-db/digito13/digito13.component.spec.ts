import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito13Component } from './digito13.component';

describe('Digito13Component', () => {
  let component: Digito13Component;
  let fixture: ComponentFixture<Digito13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
