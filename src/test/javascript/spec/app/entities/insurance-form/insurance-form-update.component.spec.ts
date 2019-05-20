/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { InsuranceTestModule } from '../../../test.module';
import { InsuranceFormUpdateComponent } from 'app/entities/insurance-form/insurance-form-update.component';
import { InsuranceFormService } from 'app/entities/insurance-form/insurance-form.service';
import { InsuranceForm } from 'app/shared/model/insurance-form.model';

describe('Component Tests', () => {
  describe('InsuranceForm Management Update Component', () => {
    let comp: InsuranceFormUpdateComponent;
    let fixture: ComponentFixture<InsuranceFormUpdateComponent>;
    let service: InsuranceFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [InsuranceFormUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(InsuranceFormUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InsuranceFormUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InsuranceFormService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InsuranceForm(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new InsuranceForm();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
