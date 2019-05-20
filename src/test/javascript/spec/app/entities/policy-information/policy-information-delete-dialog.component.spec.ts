/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { InsuranceTestModule } from '../../../test.module';
import { PolicyInformationDeleteDialogComponent } from 'app/entities/policy-information/policy-information-delete-dialog.component';
import { PolicyInformationService } from 'app/entities/policy-information/policy-information.service';

describe('Component Tests', () => {
  describe('PolicyInformation Management Delete Component', () => {
    let comp: PolicyInformationDeleteDialogComponent;
    let fixture: ComponentFixture<PolicyInformationDeleteDialogComponent>;
    let service: PolicyInformationService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceTestModule],
        declarations: [PolicyInformationDeleteDialogComponent]
      })
        .overrideTemplate(PolicyInformationDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyInformationDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyInformationService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
