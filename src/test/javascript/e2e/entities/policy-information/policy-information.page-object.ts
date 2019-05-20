import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class PolicyInformationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-policy-information div table .btn-danger'));
  title = element.all(by.css('jhi-policy-information div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PolicyInformationUpdatePage {
  pageTitle = element(by.id('jhi-policy-information-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  policyNewOrExistingInput = element(by.id('field_policyNewOrExisting'));
  policyNoExistingInput = element(by.id('field_policyNoExisting'));
  insuranceCompanyExistingInput = element(by.id('field_insuranceCompanyExisting'));
  dateOfExpireExistingInput = element(by.id('field_dateOfExpireExisting'));
  idvInput = element(by.id('field_idv'));
  ncbInput = element(by.id('field_ncb'));
  valueOfVichleInput = element(by.id('field_valueOfVichle'));
  purchaseDateInput = element(by.id('field_purchaseDate'));
  vichleManufCompInput = element(by.id('field_vichleManufComp'));
  policyTPAInput = element(by.id('field_policyTPA'));
  policyInfoGenKeyInput = element(by.id('field_policyInfoGenKey'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getPolicyNewOrExistingInput(timeout?: number) {
    return this.policyNewOrExistingInput;
  }
  async setPolicyNoExistingInput(policyNoExisting) {
    await this.policyNoExistingInput.sendKeys(policyNoExisting);
  }

  async getPolicyNoExistingInput() {
    return await this.policyNoExistingInput.getAttribute('value');
  }

  async setInsuranceCompanyExistingInput(insuranceCompanyExisting) {
    await this.insuranceCompanyExistingInput.sendKeys(insuranceCompanyExisting);
  }

  async getInsuranceCompanyExistingInput() {
    return await this.insuranceCompanyExistingInput.getAttribute('value');
  }

  async setDateOfExpireExistingInput(dateOfExpireExisting) {
    await this.dateOfExpireExistingInput.sendKeys(dateOfExpireExisting);
  }

  async getDateOfExpireExistingInput() {
    return await this.dateOfExpireExistingInput.getAttribute('value');
  }

  async setIdvInput(idv) {
    await this.idvInput.sendKeys(idv);
  }

  async getIdvInput() {
    return await this.idvInput.getAttribute('value');
  }

  async setNcbInput(ncb) {
    await this.ncbInput.sendKeys(ncb);
  }

  async getNcbInput() {
    return await this.ncbInput.getAttribute('value');
  }

  async setValueOfVichleInput(valueOfVichle) {
    await this.valueOfVichleInput.sendKeys(valueOfVichle);
  }

  async getValueOfVichleInput() {
    return await this.valueOfVichleInput.getAttribute('value');
  }

  async setPurchaseDateInput(purchaseDate) {
    await this.purchaseDateInput.sendKeys(purchaseDate);
  }

  async getPurchaseDateInput() {
    return await this.purchaseDateInput.getAttribute('value');
  }

  async setVichleManufCompInput(vichleManufComp) {
    await this.vichleManufCompInput.sendKeys(vichleManufComp);
  }

  async getVichleManufCompInput() {
    return await this.vichleManufCompInput.getAttribute('value');
  }

  async setPolicyTPAInput(policyTPA) {
    await this.policyTPAInput.sendKeys(policyTPA);
  }

  async getPolicyTPAInput() {
    return await this.policyTPAInput.getAttribute('value');
  }

  async setPolicyInfoGenKeyInput(policyInfoGenKey) {
    await this.policyInfoGenKeyInput.sendKeys(policyInfoGenKey);
  }

  async getPolicyInfoGenKeyInput() {
    return await this.policyInfoGenKeyInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PolicyInformationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-policyInformation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-policyInformation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
