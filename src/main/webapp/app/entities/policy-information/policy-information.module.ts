import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { InsuranceSharedModule } from 'app/shared';
import {
  PolicyInformationComponent,
  PolicyInformationDetailComponent,
  PolicyInformationUpdateComponent,
  PolicyInformationDeletePopupComponent,
  PolicyInformationDeleteDialogComponent,
  policyInformationRoute,
  policyInformationPopupRoute
} from './';

const ENTITY_STATES = [...policyInformationRoute, ...policyInformationPopupRoute];

@NgModule({
  imports: [InsuranceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PolicyInformationComponent,
    PolicyInformationDetailComponent,
    PolicyInformationUpdateComponent,
    PolicyInformationDeleteDialogComponent,
    PolicyInformationDeletePopupComponent
  ],
  entryComponents: [
    PolicyInformationComponent,
    PolicyInformationUpdateComponent,
    PolicyInformationDeleteDialogComponent,
    PolicyInformationDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsurancePolicyInformationModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
