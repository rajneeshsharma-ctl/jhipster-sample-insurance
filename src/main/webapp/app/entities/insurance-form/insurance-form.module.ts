import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { InsuranceSharedModule } from 'app/shared';
import {
  InsuranceFormComponent,
  InsuranceFormDetailComponent,
  InsuranceFormUpdateComponent,
  InsuranceFormDeletePopupComponent,
  InsuranceFormDeleteDialogComponent,
  insuranceFormRoute,
  insuranceFormPopupRoute
} from './';

const ENTITY_STATES = [...insuranceFormRoute, ...insuranceFormPopupRoute];

@NgModule({
  imports: [InsuranceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    InsuranceFormComponent,
    InsuranceFormDetailComponent,
    InsuranceFormUpdateComponent,
    InsuranceFormDeleteDialogComponent,
    InsuranceFormDeletePopupComponent
  ],
  entryComponents: [
    InsuranceFormComponent,
    InsuranceFormUpdateComponent,
    InsuranceFormDeleteDialogComponent,
    InsuranceFormDeletePopupComponent
  ],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceInsuranceFormModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
