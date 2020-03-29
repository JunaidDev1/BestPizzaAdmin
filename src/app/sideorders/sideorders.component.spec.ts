import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideordersComponent } from './sideorders.component';

describe('SideordersComponent', () => {
  let component: SideordersComponent;
  let fixture: ComponentFixture<SideordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
