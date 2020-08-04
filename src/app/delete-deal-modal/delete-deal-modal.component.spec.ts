import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDealModalComponent } from './delete-deal-modal.component';

describe('DeleteDealModalComponent', () => {
  let component: DeleteDealModalComponent;
  let fixture: ComponentFixture<DeleteDealModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDealModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDealModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
