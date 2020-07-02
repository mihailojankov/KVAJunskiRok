import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondDetailsComponent } from './second-details.component';

describe('SecondDetailsComponent', () => {
  let component: SecondDetailsComponent;
  let fixture: ComponentFixture<SecondDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
