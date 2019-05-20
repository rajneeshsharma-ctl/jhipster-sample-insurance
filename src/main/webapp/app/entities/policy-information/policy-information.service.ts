import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPolicyInformation } from 'app/shared/model/policy-information.model';

type EntityResponseType = HttpResponse<IPolicyInformation>;
type EntityArrayResponseType = HttpResponse<IPolicyInformation[]>;

@Injectable({ providedIn: 'root' })
export class PolicyInformationService {
  public resourceUrl = SERVER_API_URL + 'api/policy-informations';

  constructor(protected http: HttpClient) {}

  create(policyInformation: IPolicyInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyInformation);
    return this.http
      .post<IPolicyInformation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(policyInformation: IPolicyInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(policyInformation);
    return this.http
      .put<IPolicyInformation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPolicyInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPolicyInformation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(policyInformation: IPolicyInformation): IPolicyInformation {
    const copy: IPolicyInformation = Object.assign({}, policyInformation, {
      dateOfExpireExisting:
        policyInformation.dateOfExpireExisting != null && policyInformation.dateOfExpireExisting.isValid()
          ? policyInformation.dateOfExpireExisting.toJSON()
          : null,
      purchaseDate:
        policyInformation.purchaseDate != null && policyInformation.purchaseDate.isValid() ? policyInformation.purchaseDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfExpireExisting = res.body.dateOfExpireExisting != null ? moment(res.body.dateOfExpireExisting) : null;
      res.body.purchaseDate = res.body.purchaseDate != null ? moment(res.body.purchaseDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((policyInformation: IPolicyInformation) => {
        policyInformation.dateOfExpireExisting =
          policyInformation.dateOfExpireExisting != null ? moment(policyInformation.dateOfExpireExisting) : null;
        policyInformation.purchaseDate = policyInformation.purchaseDate != null ? moment(policyInformation.purchaseDate) : null;
      });
    }
    return res;
  }
}
