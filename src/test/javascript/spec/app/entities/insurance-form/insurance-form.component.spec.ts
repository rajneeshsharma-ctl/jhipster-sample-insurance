/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceTestModule } from '../../../test.module';
import { InsuranceFormComponent } from 'app/entities/insurance-form/insurance-form.component';
import { InsuranceFormService } from 'app/entities/insurance-form/insurance-form.service';
import { InsuranceForm } from 'app/shared/model/insurance-form.model';

describe('Component Tests', () => {
  describe('InsuranceForm Management Component', () => {
    let comp: InsuranceFormComponent;
    let fixture: ComponentFixture<InsuranceFormComponent>;
    let service: InsuranceFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [InsuranceFormComponent],
        providers: []
      })
        .overrideTemplate(InsuranceFormComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InsuranceFormComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InsuranceFormService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InsuranceForm(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.insuranceForms[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
