import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPolicyInformation } from 'app/shared/model/policy-information.model';
import { PolicyInformationService } from './policy-information.service';

@Component({
  selector: 'jhi-policy-information-delete-dialog',
  templateUrl: './policy-information-delete-dialog.component.html'
})
export class PolicyInformationDeleteDialogComponent {
  policyInformation: IPolicyInformation;

  constructor(
    protected policyInformationService: PolicyInformationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.policyInformationService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'policyInformationListModification',
        content: 'Deleted an policyInformation'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-policy-information-delete-popup',
  template: ''
})
export class PolicyInformationDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ policyInformation }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PolicyInformationDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.policyInformation = policyInformation;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/policy-information', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/policy-information', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
