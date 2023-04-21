import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinsManifiestoComponent } from './vins-manifiesto.component';

describe('VinsManifiestoComponent', () => {
  let component: VinsManifiestoComponent;
  let fixture: ComponentFixture<VinsManifiestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinsManifiestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinsManifiestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
