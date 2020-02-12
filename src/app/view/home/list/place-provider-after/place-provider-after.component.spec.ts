import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceProviderAfterComponent } from './place-provider-after.component';

describe('PlaceProviderAfterComponent', () => {
  let component: PlaceProviderAfterComponent;
  let fixture: ComponentFixture<PlaceProviderAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceProviderAfterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceProviderAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
