import { browser, ExpectedConditions, element, by, ElementFinder } from 'protractor';

export class DocumentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document div table .btn-danger'));
  title = element.all(by.css('jhi-document div h2#page-heading span')).first();

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

export class DocumentUpdatePage {
  pageTitle = element(by.id('jhi-document-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  titleInput = element(by.id('field_title'));
  sizeInput = element(by.id('field_size'));
  mimeTypeInput = element(by.id('field_mimeType'));
  contentSelect = element(by.id('field_content'));
  insuranceFormSelect = element(by.id('field_insuranceForm'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return await this.titleInput.getAttribute('value');
  }

  async setSizeInput(size) {
    await this.sizeInput.sendKeys(size);
  }

  async getSizeInput() {
    return await this.sizeInput.getAttribute('value');
  }

  async setMimeTypeInput(mimeType) {
    await this.mimeTypeInput.sendKeys(mimeType);
  }

  async getMimeTypeInput() {
    return await this.mimeTypeInput.getAttribute('value');
  }

  async contentSelectLastOption(timeout?: number) {
    await this.contentSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async contentSelectOption(option) {
    await this.contentSelect.sendKeys(option);
  }

  getContentSelect(): ElementFinder {
    return this.contentSelect;
  }

  async getContentSelectedOption() {
    return await this.contentSelect.element(by.css('option:checked')).getText();
  }

  async insuranceFormSelectLastOption(timeout?: number) {
    await this.insuranceFormSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async insuranceFormSelectOption(option) {
    await this.insuranceFormSelect.sendKeys(option);
  }

  getInsuranceFormSelect(): ElementFinder {
    return this.insuranceFormSelect;
  }

  async getInsuranceFormSelectedOption() {
    return await this.insuranceFormSelect.element(by.css('option:checked')).getText();
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

export class DocumentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-document-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-document'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
