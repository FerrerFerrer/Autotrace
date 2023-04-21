import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito10Component } from './digito10.component';

describe('Digito10Component', () => {
  let component: Digito10Component;
  let fixture: ComponentFixture<Digito10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
