import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPolicyInformation } from 'app/shared/model/policy-information.model';

@Component({
  selector: 'jhi-policy-information-detail',
  templateUrl: './policy-information-detail.component.html'
})
export class PolicyInformationDetailComponent implements OnInit {
  policyInformation: IPolicyInformation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyInformation }) => {
      this.policyInformation = policyInformation;
    });
  }

  previousState() {
    window.history.back();
  }
}
