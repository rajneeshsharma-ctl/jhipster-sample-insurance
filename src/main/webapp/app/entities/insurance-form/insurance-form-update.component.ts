import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IInsuranceForm, InsuranceForm } from 'app/shared/model/insurance-form.model';
import { InsuranceFormService } from './insurance-form.service';
import { IPolicyInformation } from 'app/shared/model/policy-information.model';
import { PolicyInformationService } from 'app/entities/policy-information';

@Component({
  selector: 'jhi-insurance-form-update',
  templateUrl: './insurance-form-update.component.html'
})
export class InsuranceFormUpdateComponent implements OnInit {
  insuranceForm: IInsuranceForm;
  isSaving: boolean;

  policyinfogenkeys: IPolicyInformation[];

  editForm = this.fb.group({
    id: [],
    policiesCategory: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    middleName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    address: [null, [Validators.required]],
    city: [null, [Validators.required]],
    pincode: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    emailId: [null, [Validators.required]],
    applicationGenKey: [null, [Validators.required]],
    policyInfoGenKey: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected insuranceFormService: InsuranceFormService,
    protected policyInformationService: PolicyInformationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ insuranceForm }) => {
      this.updateForm(insuranceForm);
      this.insuranceForm = insuranceForm;
    });
    this.policyInformationService
      .query({ filter: 'insuranceform-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPolicyInformation[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPolicyInformation[]>) => response.body)
      )
      .subscribe(
        (res: IPolicyInformation[]) => {
          if (!this.insuranceForm.policyInfoGenKey || !this.insuranceForm.policyInfoGenKey.id) {
            this.policyinfogenkeys = res;
          } else {
            this.policyInformationService
              .find(this.insuranceForm.policyInfoGenKey.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPolicyInformation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPolicyInformation>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPolicyInformation) => (this.policyinfogenkeys = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(insuranceForm: IInsuranceForm) {
    this.editForm.patchValue({
      id: insuranceForm.id,
      policiesCategory: insuranceForm.policiesCategory,
      firstName: insuranceForm.firstName,
      middleName: insuranceForm.middleName,
      lastName: insuranceForm.lastName,
      address: insuranceForm.address,
      city: insuranceForm.city,
      pincode: insuranceForm.pincode,
      phoneNumber: insuranceForm.phoneNumber,
      emailId: insuranceForm.emailId,
      applicationGenKey: insuranceForm.applicationGenKey,
      policyInfoGenKey: insuranceForm.policyInfoGenKey
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const insuranceForm = this.createFromForm();
    if (insuranceForm.id !== undefined) {
      this.subscribeToSaveResponse(this.insuranceFormService.update(insuranceForm));
    } else {
      this.subscribeToSaveResponse(this.insuranceFormService.create(insuranceForm));
    }
  }

  private createFromForm(): IInsuranceForm {
    const entity = {
      ...new InsuranceForm(),
      id: this.editForm.get(['id']).value,
      policiesCategory: this.editForm.get(['policiesCategory']).value,
      firstName: this.editForm.get(['firstName']).value,
      middleName: this.editForm.get(['middleName']).value,
      lastName: this.editForm.get(['lastName']).value,
      address: this.editForm.get(['address']).value,
      city: this.editForm.get(['city']).value,
      pincode: this.editForm.get(['pincode']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      emailId: this.editForm.get(['emailId']).value,
      applicationGenKey: this.editForm.get(['applicationGenKey']).value,
      policyInfoGenKey: this.editForm.get(['policyInfoGenKey']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInsuranceForm>>) {
    result.subscribe((res: HttpResponse<IInsuranceForm>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackPolicyInformationById(index: number, item: IPolicyInformation) {
    return item.id;
  }
}
