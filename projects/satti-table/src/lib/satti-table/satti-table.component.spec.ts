import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SattiTableComponent } from './satti-table.component';

describe('SattiTableComponent', () => {
  let component: SattiTableComponent;
  let fixture: ComponentFixture<SattiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SattiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SattiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
