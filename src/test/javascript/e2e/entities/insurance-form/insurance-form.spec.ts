/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InsuranceFormComponentsPage, InsuranceFormDeleteDialog, InsuranceFormUpdatePage } from './insurance-form.page-object';

const expect = chai.expect;

describe('InsuranceForm e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let insuranceFormUpdatePage: InsuranceFormUpdatePage;
  let insuranceFormComponentsPage: InsuranceFormComponentsPage;
  let insuranceFormDeleteDialog: InsuranceFormDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InsuranceForms', async () => {
    await navBarPage.goToEntity('insurance-form');
    insuranceFormComponentsPage = new InsuranceFormComponentsPage();
    await browser.wait(ec.visibilityOf(insuranceFormComponentsPage.title), 5000);
    expect(await insuranceFormComponentsPage.getTitle()).to.eq('insuranceApp.insuranceForm.home.title');
  });

  it('should load create InsuranceForm page', async () => {
    await insuranceFormComponentsPage.clickOnCreateButton();
    insuranceFormUpdatePage = new InsuranceFormUpdatePage();
    expect(await insuranceFormUpdatePage.getPageTitle()).to.eq('insuranceApp.insuranceForm.home.createOrEditLabel');
    await insuranceFormUpdatePage.cancel();
  });

  it('should create and save InsuranceForms', async () => {
    const nbButtonsBeforeCreate = await insuranceFormComponentsPage.countDeleteButtons();

    await insuranceFormComponentsPage.clickOnCreateButton();
    await promise.all([
      insuranceFormUpdatePage.setPoliciesCategoryInput('5'),
      insuranceFormUpdatePage.setFirstNameInput('firstName'),
      insuranceFormUpdatePage.setMiddleNameInput('middleName'),
      insuranceFormUpdatePage.setLastNameInput('lastName'),
      insuranceFormUpdatePage.setAddressInput('address'),
      insuranceFormUpdatePage.setCityInput('city'),
      insuranceFormUpdatePage.setPincodeInput('5'),
      insuranceFormUpdatePage.setPhoneNumberInput('5'),
      insuranceFormUpdatePage.setEmailIdInput('emailId'),
      insuranceFormUpdatePage.setApplicationGenKeyInput('5'),
      insuranceFormUpdatePage.policyInfoGenKeySelectLastOption()
    ]);
    expect(await insuranceFormUpdatePage.getPoliciesCategoryInput()).to.eq('5', 'Expected policiesCategory value to be equals to 5');
    expect(await insuranceFormUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await insuranceFormUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await insuranceFormUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await insuranceFormUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await insuranceFormUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await insuranceFormUpdatePage.getPincodeInput()).to.eq('5', 'Expected pincode value to be equals to 5');
    expect(await insuranceFormUpdatePage.getPhoneNumberInput()).to.eq('5', 'Expected phoneNumber value to be equals to 5');
    expect(await insuranceFormUpdatePage.getEmailIdInput()).to.eq('emailId', 'Expected EmailId value to be equals to emailId');
    expect(await insuranceFormUpdatePage.getApplicationGenKeyInput()).to.eq('5', 'Expected applicationGenKey value to be equals to 5');
    await insuranceFormUpdatePage.save();
    expect(await insuranceFormUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await insuranceFormComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last InsuranceForm', async () => {
    const nbButtonsBeforeDelete = await insuranceFormComponentsPage.countDeleteButtons();
    await insuranceFormComponentsPage.clickOnLastDeleteButton();

    insuranceFormDeleteDialog = new InsuranceFormDeleteDialog();
    expect(await insuranceFormDeleteDialog.getDialogTitle()).to.eq('insuranceApp.insuranceForm.delete.question');
    await insuranceFormDeleteDialog.clickOnConfirmButton();

    expect(await insuranceFormComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
