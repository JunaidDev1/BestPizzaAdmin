import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombodealsComponent } from './combodeals.component';

describe('CombodealsComponent', () => {
  let component: CombodealsComponent;
  let fixture: ComponentFixture<CombodealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombodealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombodealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
