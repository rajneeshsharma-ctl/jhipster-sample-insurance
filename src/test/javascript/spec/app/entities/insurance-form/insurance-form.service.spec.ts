/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { InsuranceFormService } from 'app/entities/insurance-form/insurance-form.service';
import { IInsuranceForm, InsuranceForm } from 'app/shared/model/insurance-form.model';

describe('Service Tests', () => {
  describe('InsuranceForm Service', () => {
    let injector: TestBed;
    let service: InsuranceFormService;
    let httpMock: HttpTestingController;
    let elemDefault: IInsuranceForm;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(InsuranceFormService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new InsuranceForm(0, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a InsuranceForm', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new InsuranceForm(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a InsuranceForm', async () => {
        const returnedFromService = Object.assign(
          {
            policiesCategory: 1,
            firstName: 'BBBBBB',
            middleName: 'BBBBBB',
            lastName: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            pincode: 1,
            phoneNumber: 1,
            emailId: 'BBBBBB',
            applicationGenKey: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of InsuranceForm', async () => {
        const returnedFromService = Object.assign(
          {
            policiesCategory: 1,
            firstName: 'BBBBBB',
            middleName: 'BBBBBB',
            lastName: 'BBBBBB',
            address: 'BBBBBB',
            city: 'BBBBBB',
            pincode: 1,
            phoneNumber: 1,
            emailId: 'BBBBBB',
            applicationGenKey: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
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

      it('should delete a InsuranceForm', async () => {
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
