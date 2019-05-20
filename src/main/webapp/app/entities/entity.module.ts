import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'insurance-form',
        loadChildren: './insurance-form/insurance-form.module#InsuranceInsuranceFormModule'
      },
      {
        path: 'policy-information',
        loadChildren: './policy-information/policy-information.module#InsurancePolicyInformationModule'
      },
      {
        path: 'document',
        loadChildren: './document/document.module#InsuranceDocumentModule'
      },
      {
        path: 'content',
        loadChildren: './content/content.module#InsuranceContentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceEntityModule {}
