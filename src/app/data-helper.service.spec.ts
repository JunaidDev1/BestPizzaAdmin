import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { DataHelperService } from './data-helper.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('DataHelperService', () => {

  let dataHelper: DataHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataHelperService],
      imports: [HttpClientTestingModule]
    });
    dataHelper = TestBed.get(DataHelperService);
  });

  // it('======= FETCH LIST OF 3 USERS', () => {
  //   const listOfUsers = [1, 2, 3];
  //   spyOn(dataHelper, 'getAPiUsers').and.callFake(() => {
  //     return of([listOfUsers]);
  //   });

  //   spyOn(hc, 'get').and.callFake(() => {
  //     return of('url');
  //   });

  //   dataHelper.getAPiUsers().subscribe((res: any) => {
  //     expect(res.length).toBe(3);
  //   });
  // });


  it('FETCH LIST OF 3 USERS', fakeAsync(inject([HttpClient], (hc) => {
    const listOfUsers = [1, 2, 3];
    spyOn(hc, 'get').and.callFake(() => {
      return of(listOfUsers);
    });
    const result = dataHelper.getAPiUsers();
    result.then((res: any) => {
      expect(res.length).toBe(3);
    });
  })
  ));

});
