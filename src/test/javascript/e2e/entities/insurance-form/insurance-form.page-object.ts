import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class InsuranceFormComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-insurance-form div table .btn-danger'));
  title = element.all(by.css('jhi-insurance-form div h2#page-heading span')).first();

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

export class InsuranceFormUpdatePage {
  pageTitle = element(by.id('jhi-insurance-form-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  policiesCategoryInput = element(by.id('field_policiesCategory'));
  firstNameInput = element(by.id('field_firstName'));
  middleNameInput = element(by.id('field_middleName'));
  lastNameInput = element(by.id('field_lastName'));
  addressInput = element(by.id('field_address'));
  cityInput = element(by.id('field_city'));
  pincodeInput = element(by.id('field_pincode'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  emailIdInput = element(by.id('field_emailId'));
  applicationGenKeyInput = element(by.id('field_applicationGenKey'));
  policyInfoGenKeySelect = element(by.id('field_policyInfoGenKey'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPoliciesCategoryInput(policiesCategory) {
    await this.policiesCategoryInput.sendKeys(policiesCategory);
  }

  async getPoliciesCategoryInput() {
    return await this.policiesCategoryInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName) {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput() {
    return await this.middleNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setAddressInput(address) {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput() {
    return await this.addressInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return await this.cityInput.getAttribute('value');
  }

  async setPincodeInput(pincode) {
    await this.pincodeInput.sendKeys(pincode);
  }

  async getPincodeInput() {
    return await this.pincodeInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setEmailIdInput(emailId) {
    await this.emailIdInput.sendKeys(emailId);
  }

  async getEmailIdInput() {
    return await this.emailIdInput.getAttribute('value');
  }

  async setApplicationGenKeyInput(applicationGenKey) {
    await this.applicationGenKeyInput.sendKeys(applicationGenKey);
  }

  async getApplicationGenKeyInput() {
    return await this.applicationGenKeyInput.getAttribute('value');
  }

  async policyInfoGenKeySelectLastOption(timeout?: number) {
    await this.policyInfoGenKeySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async policyInfoGenKeySelectOption(option) {
    await this.policyInfoGenKeySelect.sendKeys(option);
  }

  getPolicyInfoGenKeySelect(): ElementFinder {
    return this.policyInfoGenKeySelect;
  }

  async getPolicyInfoGenKeySelectedOption() {
    return await this.policyInfoGenKeySelect.element(by.css('option:checked')).getText();
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

export class InsuranceFormDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-insuranceForm-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-insuranceForm'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
