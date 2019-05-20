import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InsuranceSharedLibsModule, InsuranceSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [InsuranceSharedLibsModule, InsuranceSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [InsuranceSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InsuranceSharedModule {
  static forRoot() {
    return {
      ngModule: InsuranceSharedModule
    };
  }
}
