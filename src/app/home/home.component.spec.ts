import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { DataHelperService } from '../data-helper.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataHelper: DataHelperService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(HomeComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    dataHelper = new DataHelperService(null);
    component = new HomeComponent(dataHelper);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list of 3 users', () => {
    const listOfUsers = [1, 2, 3];
    spyOn(component, 'getAllUsers').and.callFake(() => {
      return from([listOfUsers]);
    });

    // component.ngOnInit();
    component.getAllUsers();
    // expect(spyResult).toHaveBeenCalled();
    expect(component.apiUsersList.length).toBe(3);
  });


});
