import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDocument, Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { IContent } from 'app/shared/model/content.model';
import { ContentService } from 'app/entities/content';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';
import { InsuranceFormService } from 'app/entities/insurance-form';

@Component({
  selector: 'jhi-document-update',
  templateUrl: './document-update.component.html'
})
export class DocumentUpdateComponent implements OnInit {
  document: IDocument;
  isSaving: boolean;

  contents: IContent[];

  insuranceforms: IInsuranceForm[];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    size: [null, [Validators.required]],
    mimeType: [],
    content: [],
    insuranceForm: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected documentService: DocumentService,
    protected contentService: ContentService,
    protected insuranceFormService: InsuranceFormService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ document }) => {
      this.updateForm(document);
      this.document = document;
    });
    this.contentService
      .query({ filter: 'document-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IContent[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContent[]>) => response.body)
      )
      .subscribe(
        (res: IContent[]) => {
          if (!this.document.content || !this.document.content.id) {
            this.contents = res;
          } else {
            this.contentService
              .find(this.document.content.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IContent>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IContent>) => subResponse.body)
              )
              .subscribe(
                (subRes: IContent) => (this.contents = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.insuranceFormService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IInsuranceForm[]>) => mayBeOk.ok),
        map((response: HttpResponse<IInsuranceForm[]>) => response.body)
      )
      .subscribe((res: IInsuranceForm[]) => (this.insuranceforms = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(document: IDocument) {
    this.editForm.patchValue({
      id: document.id,
      title: document.title,
      size: document.size,
      mimeType: document.mimeType,
      content: document.content,
      insuranceForm: document.insuranceForm
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const document = this.createFromForm();
    if (document.id !== undefined) {
      this.subscribeToSaveResponse(this.documentService.update(document));
    } else {
      this.subscribeToSaveResponse(this.documentService.create(document));
    }
  }

  private createFromForm(): IDocument {
    const entity = {
      ...new Document(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      size: this.editForm.get(['size']).value,
      mimeType: this.editForm.get(['mimeType']).value,
      content: this.editForm.get(['content']).value,
      insuranceForm: this.editForm.get(['insuranceForm']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
    result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackContentById(index: number, item: IContent) {
    return item.id;
  }

  trackInsuranceFormById(index: number, item: IInsuranceForm) {
    return item.id;
  }
}
