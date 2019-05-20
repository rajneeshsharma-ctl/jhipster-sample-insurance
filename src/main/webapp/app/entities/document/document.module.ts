import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { InsuranceSharedModule } from 'app/shared';
import {
  DocumentComponent,
  DocumentDetailComponent,
  DocumentUpdateComponent,
  DocumentDeletePopupComponent,
  DocumentDeleteDialogComponent,
  documentRoute,
  documentPopupRoute
} from './';

const ENTITY_STATES = [...documentRoute, ...documentPopupRoute];

@NgModule({
  imports: [InsuranceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DocumentComponent,
    DocumentDetailComponent,
    DocumentUpdateComponent,
    DocumentDeleteDialogComponent,
    DocumentDeletePopupComponent
  ],
  entryComponents: [DocumentComponent, DocumentUpdateComponent, DocumentDeleteDialogComponent, DocumentDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceDocumentModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
