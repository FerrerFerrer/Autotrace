import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito4Component } from './digito4.component';

describe('Digito4Component', () => {
  let component: Digito4Component;
  let fixture: ComponentFixture<Digito4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
