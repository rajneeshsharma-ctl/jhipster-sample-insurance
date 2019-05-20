import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPolicyInformation, PolicyInformation } from 'app/shared/model/policy-information.model';
import { PolicyInformationService } from './policy-information.service';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';
import { InsuranceFormService } from 'app/entities/insurance-form';

@Component({
  selector: 'jhi-policy-information-update',
  templateUrl: './policy-information-update.component.html'
})
export class PolicyInformationUpdateComponent implements OnInit {
  policyInformation: IPolicyInformation;
  isSaving: boolean;

  insuranceforms: IInsuranceForm[];

  editForm = this.fb.group({
    id: [],
    policyNewOrExisting: [null, [Validators.required]],
    policyNoExisting: [],
    insuranceCompanyExisting: [],
    dateOfExpireExisting: [],
    idv: [],
    ncb: [],
    valueOfVichle: [],
    purchaseDate: [],
    vichleManufComp: [],
    policyTPA: [],
    policyInfoGenKey: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected policyInformationService: PolicyInformationService,
    protected insuranceFormService: InsuranceFormService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ policyInformation }) => {
      this.updateForm(policyInformation);
      this.policyInformation = policyInformation;
    });
    this.insuranceFormService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IInsuranceForm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInsuranceForm[]>) => response.body)
      )
      .subscribe((res: IInsuranceForm[]) => (this.insuranceforms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(policyInformation: IPolicyInformation) {
    this.editForm.patchValue({
      id: policyInformation.id,
      policyNewOrExisting: policyInformation.policyNewOrExisting,
      policyNoExisting: policyInformation.policyNoExisting,
      insuranceCompanyExisting: policyInformation.insuranceCompanyExisting,
      dateOfExpireExisting:
        policyInformation.dateOfExpireExisting != null ? policyInformation.dateOfExpireExisting.format(DATE_TIME_FORMAT) : null,
      idv: policyInformation.idv,
      ncb: policyInformation.ncb,
      valueOfVichle: policyInformation.valueOfVichle,
      purchaseDate: policyInformation.purchaseDate != null ? policyInformation.purchaseDate.format(DATE_TIME_FORMAT) : null,
      vichleManufComp: policyInformation.vichleManufComp,
      policyTPA: policyInformation.policyTPA,
      policyInfoGenKey: policyInformation.policyInfoGenKey
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const policyInformation = this.createFromForm();
    if (policyInformation.id !== undefined) {
      this.subscribeToSaveResponse(this.policyInformationService.update(policyInformation));
    } else {
      this.subscribeToSaveResponse(this.policyInformationService.create(policyInformation));
    }
  }

  private createFromForm(): IPolicyInformation {
    const entity = {
      ...new PolicyInformation(),
      id: this.editForm.get(['id']).value,
      policyNewOrExisting: this.editForm.get(['policyNewOrExisting']).value,
      policyNoExisting: this.editForm.get(['policyNoExisting']).value,
      insuranceCompanyExisting: this.editForm.get(['insuranceCompanyExisting']).value,
      dateOfExpireExisting:
        this.editForm.get(['dateOfExpireExisting']).value != null
          ? moment(this.editForm.get(['dateOfExpireExisting']).value, DATE_TIME_FORMAT)
          : undefined,
      idv: this.editForm.get(['idv']).value,
      ncb: this.editForm.get(['ncb']).value,
      valueOfVichle: this.editForm.get(['valueOfVichle']).value,
      purchaseDate:
        this.editForm.get(['purchaseDate']).value != null ? moment(this.editForm.get(['purchaseDate']).value, DATE_TIME_FORMAT) : undefined,
      vichleManufComp: this.editForm.get(['vichleManufComp']).value,
      policyTPA: this.editForm.get(['policyTPA']).value,
      policyInfoGenKey: this.editForm.get(['policyInfoGenKey']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicyInformation>>) {
    result.subscribe((res: HttpResponse<IPolicyInformation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackInsuranceFormById(index: number, item: IInsuranceForm) {
    return item.id;
  }
}
