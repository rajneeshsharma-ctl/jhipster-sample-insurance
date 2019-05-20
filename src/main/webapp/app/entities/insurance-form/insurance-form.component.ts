import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInsuranceForm } from 'app/shared/model/insurance-form.model';
import { AccountService } from 'app/core';
import { InsuranceFormService } from './insurance-form.service';

@Component({
  selector: 'jhi-insurance-form',
  templateUrl: './insurance-form.component.html'
})
export class InsuranceFormComponent implements OnInit, OnDestroy {
  insuranceForms: IInsuranceForm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected insuranceFormService: InsuranceFormService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.insuranceFormService
      .query()
      .pipe(
        filter((res: HttpResponse<IInsuranceForm[]>) => res.ok),
        map((res: HttpResponse<IInsuranceForm[]>) => res.body)
      )
      .subscribe(
        (res: IInsuranceForm[]) => {
          this.insuranceForms = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInInsuranceForms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IInsuranceForm) {
    return item.id;
  }

  registerChangeInInsuranceForms() {
    this.eventSubscriber = this.eventManager.subscribe('insuranceFormListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
