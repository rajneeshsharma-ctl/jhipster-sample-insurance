import { IPolicyInformation } from 'app/shared/model/policy-information.model';
import { IDocument } from 'app/shared/model/document.model';

export interface IInsuranceForm {
  id?: number;
  policiesCategory?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  pincode?: number;
  phoneNumber?: number;
  emailId?: string;
  applicationGenKey?: number;
  policyInfoGenKey?: IPolicyInformation;
  documents?: IDocument[];
}

export class InsuranceForm implements IInsuranceForm {
  constructor(
    public id?: number,
    public policiesCategory?: number,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public address?: string,
    public city?: string,
    public pincode?: number,
    public phoneNumber?: number,
    public emailId?: string,
    public applicationGenKey?: number,
    public policyInfoGenKey?: IPolicyInformation,
    public documents?: IDocument[]
  ) {}
}
