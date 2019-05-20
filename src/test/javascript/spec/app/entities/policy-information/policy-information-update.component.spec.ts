/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { InsuranceTestModule } from '../../../test.module';
import { PolicyInformationUpdateComponent } from 'app/entities/policy-information/policy-information-update.component';
import { PolicyInformationService } from 'app/entities/policy-information/policy-information.service';
import { PolicyInformation } from 'app/shared/model/policy-information.model';

describe('Component Tests', () => {
  describe('PolicyInformation Management Update Component', () => {
    let comp: PolicyInformationUpdateComponent;
    let fixture: ComponentFixture<PolicyInformationUpdateComponent>;
    let service: PolicyInformationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [PolicyInformationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyInformationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyInformationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyInformationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyInformation(123);
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
        const entity = new PolicyInformation();
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
