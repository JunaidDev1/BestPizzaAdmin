import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealModalComponent } from './add-deal-modal.component';

describe('AddDealModalComponent', () => {
  let component: AddDealModalComponent;
  let fixture: ComponentFixture<AddDealModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDealModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
