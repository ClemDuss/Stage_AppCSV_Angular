import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToExportProviderComponent } from './to-export-provider.component';

describe('ToExportProviderComponent', () => {
  let component: ToExportProviderComponent;
  let fixture: ComponentFixture<ToExportProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToExportProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToExportProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
