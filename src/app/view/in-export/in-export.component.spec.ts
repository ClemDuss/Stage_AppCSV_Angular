import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InExportComponent } from './in-export.component';

describe('InExportComponent', () => {
  let component: InExportComponent;
  let fixture: ComponentFixture<InExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
