/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceTestModule } from '../../../test.module';
import { PolicyInformationComponent } from 'app/entities/policy-information/policy-information.component';
import { PolicyInformationService } from 'app/entities/policy-information/policy-information.service';
import { PolicyInformation } from 'app/shared/model/policy-information.model';

describe('Component Tests', () => {
  describe('PolicyInformation Management Component', () => {
    let comp: PolicyInformationComponent;
    let fixture: ComponentFixture<PolicyInformationComponent>;
    let service: PolicyInformationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [PolicyInformationComponent],
        providers: []
      })
        .overrideTemplate(PolicyInformationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyInformationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyInformationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PolicyInformation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.policyInformations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
