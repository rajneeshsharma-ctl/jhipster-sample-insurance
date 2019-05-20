/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceTestModule } from '../../../test.module';
import { PolicyInformationDetailComponent } from 'app/entities/policy-information/policy-information-detail.component';
import { PolicyInformation } from 'app/shared/model/policy-information.model';

describe('Component Tests', () => {
  describe('PolicyInformation Management Detail Component', () => {
    let comp: PolicyInformationDetailComponent;
    let fixture: ComponentFixture<PolicyInformationDetailComponent>;
    const route = ({ data: of({ policyInformation: new PolicyInformation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [PolicyInformationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyInformationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyInformationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policyInformation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
