import { Moment } from 'moment';
import { IInsuranceForm } from 'app/shared/model/insurance-form.model';

export interface IPolicyInformation {
  id?: number;
  policyNewOrExisting?: boolean;
  policyNoExisting?: string;
  insuranceCompanyExisting?: number;
  dateOfExpireExisting?: Moment;
  idv?: string;
  ncb?: string;
  valueOfVichle?: number;
  purchaseDate?: Moment;
  vichleManufComp?: string;
  policyTPA?: string;
  policyInfoGenKey?: number;
  insuranceForm?: IInsuranceForm;
}

export class PolicyInformation implements IPolicyInformation {
  constructor(
    public id?: number,
    public policyNewOrExisting?: boolean,
    public policyNoExisting?: string,
    public insuranceCompanyExisting?: number,
    public dateOfExpireExisting?: Moment,
    public idv?: string,
    public ncb?: string,
    public valueOfVichle?: number,
    public purchaseDate?: Moment,
    public vichleManufComp?: string,
    public policyTPA?: string,
    public policyInfoGenKey?: number,
    public insuranceForm?: IInsuranceForm
  ) {
    this.policyNewOrExisting = this.policyNewOrExisting || false;
  }
}
