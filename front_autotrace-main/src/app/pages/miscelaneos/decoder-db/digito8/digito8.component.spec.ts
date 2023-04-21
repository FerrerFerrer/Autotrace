import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Digito8Component } from './digito8.component';

describe('Digito8Component', () => {
  let component: Digito8Component;
  let fixture: ComponentFixture<Digito8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Digito8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Digito8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
