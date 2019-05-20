import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsuranceForm } from 'app/shared/model/insurance-form.model';
import { InsuranceFormService } from './insurance-form.service';

@Component({
  selector: 'jhi-insurance-form-delete-dialog',
  templateUrl: './insurance-form-delete-dialog.component.html'
})
export class InsuranceFormDeleteDialogComponent {
  insuranceForm: IInsuranceForm;

  constructor(
    protected insuranceFormService: InsuranceFormService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.insuranceFormService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'insuranceFormListModification',
        content: 'Deleted an insuranceForm'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-insurance-form-delete-popup',
  template: ''
})
export class InsuranceFormDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ insuranceForm }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(InsuranceFormDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.insuranceForm = insuranceForm;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/insurance-form', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/insurance-form', { outlets: { popup: null } }]);
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
