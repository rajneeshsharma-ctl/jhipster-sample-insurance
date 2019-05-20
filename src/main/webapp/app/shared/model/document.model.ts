import { IContent } from 'app/shared/model/content.model';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';

export interface IDocument {
  id?: number;
  title?: string;
  size?: number;
  mimeType?: string;
  content?: IContent;
  insuranceForm?: IInsuranceForm;
}

export class Document implements IDocument {
  constructor(
    public id?: number,
    public title?: string,
    public size?: number,
    public mimeType?: string,
    public content?: IContent,
    public insuranceForm?: IInsuranceForm
  ) {}
}
