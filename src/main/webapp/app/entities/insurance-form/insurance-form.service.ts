import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';

type EntityResponseType = HttpResponse<IInsuranceForm>;
type EntityArrayResponseType = HttpResponse<IInsuranceForm[]>;

@Injectable({ providedIn: 'root' })
export class InsuranceFormService {
  public resourceUrl = SERVER_API_URL + 'api/insurance-forms';

  constructor(protected http: HttpClient) {}

  create(insuranceForm: IInsuranceForm): Observable<EntityResponseType> {
    return this.http.post<IInsuranceForm>(this.resourceUrl, insuranceForm, { observe: 'response' });
  }

  update(insuranceForm: IInsuranceForm): Observable<EntityResponseType> {
    return this.http.put<IInsuranceForm>(this.resourceUrl, insuranceForm, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInsuranceForm>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInsuranceForm[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
