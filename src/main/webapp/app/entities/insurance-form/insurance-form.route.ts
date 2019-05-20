import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { InsuranceForm } from 'app/shared/model/insurance-form.model';
import { InsuranceFormService } from './insurance-form.service';
import { InsuranceFormComponent } from './insurance-form.component';
import { InsuranceFormDetailComponent } from './insurance-form-detail.component';
import { InsuranceFormUpdateComponent } from './insurance-form-update.component';
import { InsuranceFormDeletePopupComponent } from './insurance-form-delete-dialog.component';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';

@Injectable({ providedIn: 'root' })
export class InsuranceFormResolve implements Resolve<IInsuranceForm> {
  constructor(private service: InsuranceFormService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IInsuranceForm> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<InsuranceForm>) => response.ok),
        map((insuranceForm: HttpResponse<InsuranceForm>) => insuranceForm.body)
      );
    }
    return of(new InsuranceForm());
  }
}

export const insuranceFormRoute: Routes = [
  {
    path: '',
    component: InsuranceFormComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.insuranceForm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: InsuranceFormDetailComponent,
    resolve: {
      insuranceForm: InsuranceFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.insuranceForm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: InsuranceFormUpdateComponent,
    resolve: {
      insuranceForm: InsuranceFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.insuranceForm.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: InsuranceFormUpdateComponent,
    resolve: {
      insuranceForm: InsuranceFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.insuranceForm.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const insuranceFormPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: InsuranceFormDeletePopupComponent,
    resolve: {
      insuranceForm: InsuranceFormResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.insuranceForm.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
