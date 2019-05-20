/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PolicyInformationService } from 'app/entities/policy-information/policy-information.service';
import { IPolicyInformation, PolicyInformation } from 'app/shared/model/policy-information.model';

describe('Service Tests', () => {
  describe('PolicyInformation Service', () => {
    let injector: TestBed;
    let service: PolicyInformationService;
    let httpMock: HttpTestingController;
    let elemDefault: IPolicyInformation;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PolicyInformationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PolicyInformation(
        0,
        false,
        'AAAAAAA',
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            dateOfExpireExisting: currentDate.format(DATE_TIME_FORMAT),
            purchaseDate: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a PolicyInformation', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOfExpireExisting: currentDate.format(DATE_TIME_FORMAT),
            purchaseDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateOfExpireExisting: currentDate,
            purchaseDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new PolicyInformation(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PolicyInformation', async () => {
        const returnedFromService = Object.assign(
          {
            policyNewOrExisting: true,
            policyNoExisting: 'BBBBBB',
            insuranceCompanyExisting: 1,
            dateOfExpireExisting: currentDate.format(DATE_TIME_FORMAT),
            idv: 'BBBBBB',
            ncb: 'BBBBBB',
            valueOfVichle: 1,
            purchaseDate: currentDate.format(DATE_TIME_FORMAT),
            vichleManufComp: 'BBBBBB',
            policyTPA: 'BBBBBB',
            policyInfoGenKey: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfExpireExisting: currentDate,
            purchaseDate: currentDate
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

      it('should return a list of PolicyInformation', async () => {
        const returnedFromService = Object.assign(
          {
            policyNewOrExisting: true,
            policyNoExisting: 'BBBBBB',
            insuranceCompanyExisting: 1,
            dateOfExpireExisting: currentDate.format(DATE_TIME_FORMAT),
            idv: 'BBBBBB',
            ncb: 'BBBBBB',
            valueOfVichle: 1,
            purchaseDate: currentDate.format(DATE_TIME_FORMAT),
            vichleManufComp: 'BBBBBB',
            policyTPA: 'BBBBBB',
            policyInfoGenKey: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateOfExpireExisting: currentDate,
            purchaseDate: currentDate
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

      it('should delete a PolicyInformation', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

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
