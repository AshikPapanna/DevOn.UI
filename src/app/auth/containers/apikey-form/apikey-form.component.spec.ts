import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApikeyFormComponent } from './apikey-form.component';

describe('ApikeyFormComponent', () => {
  let component: ApikeyFormComponent;
  let fixture: ComponentFixture<ApikeyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApikeyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApikeyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
