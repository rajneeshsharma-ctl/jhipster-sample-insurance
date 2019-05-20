import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPolicyInformation } from 'app/shared/model/policy-information.model';
import { AccountService } from 'app/core';
import { PolicyInformationService } from './policy-information.service';

@Component({
  selector: 'jhi-policy-information',
  templateUrl: './policy-information.component.html'
})
export class PolicyInformationComponent implements OnInit, OnDestroy {
  policyInformations: IPolicyInformation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected policyInformationService: PolicyInformationService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.policyInformationService
      .query()
      .pipe(
        filter((res: HttpResponse<IPolicyInformation[]>) => res.ok),
        map((res: HttpResponse<IPolicyInformation[]>) => res.body)
      )
      .subscribe(
        (res: IPolicyInformation[]) => {
          this.policyInformations = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPolicyInformations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPolicyInformation) {
    return item.id;
  }

  registerChangeInPolicyInformations() {
    this.eventSubscriber = this.eventManager.subscribe('policyInformationListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
