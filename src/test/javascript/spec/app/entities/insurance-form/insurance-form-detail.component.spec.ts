/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceTestModule } from '../../../test.module';
import { InsuranceFormDetailComponent } from 'app/entities/insurance-form/insurance-form-detail.component';
import { InsuranceForm } from 'app/shared/model/insurance-form.model';

describe('Component Tests', () => {
  describe('InsuranceForm Management Detail Component', () => {
    let comp: InsuranceFormDetailComponent;
    let fixture: ComponentFixture<InsuranceFormDetailComponent>;
    const route = ({ data: of({ insuranceForm: new InsuranceForm(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [InsuranceFormDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(InsuranceFormDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InsuranceFormDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.insuranceForm).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
