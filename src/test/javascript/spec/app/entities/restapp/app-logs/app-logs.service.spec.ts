import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AppLogsService } from 'app/entities/restapp/app-logs/app-logs.service';
import { IAppLogs, AppLogs } from 'app/shared/model/restapp/app-logs.model';

describe('Service Tests', () => {
  describe('AppLogs Service', () => {
    let injector: TestBed;
    let service: AppLogsService;
    let httpMock: HttpTestingController;
    let elemDefault: IAppLogs;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(AppLogsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AppLogs(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            entryDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a AppLogs', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            entryDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            entryDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new AppLogs(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a AppLogs', () => {
        const returnedFromService = Object.assign(
          {
            logId: 'BBBBBB',
            entryDate: currentDate.format(DATE_TIME_FORMAT),
            logger: 'BBBBBB',
            logLevel: 'BBBBBB',
            message: 'BBBBBB',
            username: 'BBBBBB',
            aplicatie: 'BBBBBB',
            cod: 'BBBBBB',
            tip: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            entryDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of AppLogs', () => {
        const returnedFromService = Object.assign(
          {
            logId: 'BBBBBB',
            entryDate: currentDate.format(DATE_TIME_FORMAT),
            logger: 'BBBBBB',
            logLevel: 'BBBBBB',
            message: 'BBBBBB',
            username: 'BBBBBB',
            aplicatie: 'BBBBBB',
            cod: 'BBBBBB',
            tip: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            entryDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AppLogs', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
