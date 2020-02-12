import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCsvComponent } from './create-csv.component';

describe('CreateCsvComponent', () => {
  let component: CreateCsvComponent;
  let fixture: ComponentFixture<CreateCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
