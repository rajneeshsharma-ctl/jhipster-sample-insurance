import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PolicyInformation } from 'app/shared/model/policy-information.model';
import { PolicyInformationService } from './policy-information.service';
import { PolicyInformationComponent } from './policy-information.component';
import { PolicyInformationDetailComponent } from './policy-information-detail.component';
import { PolicyInformationUpdateComponent } from './policy-information-update.component';
import { PolicyInformationDeletePopupComponent } from './policy-information-delete-dialog.component';
import { IPolicyInformation } from 'app/shared/model/policy-information.model';

@Injectable({ providedIn: 'root' })
export class PolicyInformationResolve implements Resolve<IPolicyInformation> {
  constructor(private service: PolicyInformationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPolicyInformation> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PolicyInformation>) => response.ok),
        map((policyInformation: HttpResponse<PolicyInformation>) => policyInformation.body)
      );
    }
    return of(new PolicyInformation());
  }
}

export const policyInformationRoute: Routes = [
  {
    path: '',
    component: PolicyInformationComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.policyInformation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyInformationDetailComponent,
    resolve: {
      policyInformation: PolicyInformationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.policyInformation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyInformationUpdateComponent,
    resolve: {
      policyInformation: PolicyInformationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.policyInformation.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyInformationUpdateComponent,
    resolve: {
      policyInformation: PolicyInformationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.policyInformation.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const policyInformationPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PolicyInformationDeletePopupComponent,
    resolve: {
      policyInformation: PolicyInformationResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'insuranceApp.policyInformation.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
