import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceProviderBeforeComponent } from './place-provider-before.component';

describe('PlaceProviderBeforeComponent', () => {
  let component: PlaceProviderBeforeComponent;
  let fixture: ComponentFixture<PlaceProviderBeforeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceProviderBeforeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceProviderBeforeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
