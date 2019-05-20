import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsuranceForm } from 'app/shared/model/insurance-form.model';

@Component({
  selector: 'jhi-insurance-form-detail',
  templateUrl: './insurance-form-detail.component.html'
})
export class InsuranceFormDetailComponent implements OnInit {
  insuranceForm: IInsuranceForm;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ insuranceForm }) => {
      this.insuranceForm = insuranceForm;
    });
  }

  previousState() {
    window.history.back();
  }
}
