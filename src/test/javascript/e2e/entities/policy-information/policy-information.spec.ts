/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PolicyInformationComponentsPage,
  PolicyInformationDeleteDialog,
  PolicyInformationUpdatePage
} from './policy-information.page-object';

const expect = chai.expect;

describe('PolicyInformation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let policyInformationUpdatePage: PolicyInformationUpdatePage;
  let policyInformationComponentsPage: PolicyInformationComponentsPage;
  /*let policyInformationDeleteDialog: PolicyInformationDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PolicyInformations', async () => {
    await navBarPage.goToEntity('policy-information');
    policyInformationComponentsPage = new PolicyInformationComponentsPage();
    await browser.wait(ec.visibilityOf(policyInformationComponentsPage.title), 5000);
    expect(await policyInformationComponentsPage.getTitle()).to.eq('insuranceApp.policyInformation.home.title');
  });

  it('should load create PolicyInformation page', async () => {
    await policyInformationComponentsPage.clickOnCreateButton();
    policyInformationUpdatePage = new PolicyInformationUpdatePage();
    expect(await policyInformationUpdatePage.getPageTitle()).to.eq('insuranceApp.policyInformation.home.createOrEditLabel');
    await policyInformationUpdatePage.cancel();
  });

  /* it('should create and save PolicyInformations', async () => {
        const nbButtonsBeforeCreate = await policyInformationComponentsPage.countDeleteButtons();

        await policyInformationComponentsPage.clickOnCreateButton();
        await promise.all([
            policyInformationUpdatePage.setPolicyNoExistingInput('policyNoExisting'),
            policyInformationUpdatePage.setInsuranceCompanyExistingInput('5'),
            policyInformationUpdatePage.setDateOfExpireExistingInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            policyInformationUpdatePage.setIdvInput('idv'),
            policyInformationUpdatePage.setNcbInput('ncb'),
            policyInformationUpdatePage.setValueOfVichleInput('5'),
            policyInformationUpdatePage.setPurchaseDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            policyInformationUpdatePage.setVichleManufCompInput('vichleManufComp'),
            policyInformationUpdatePage.setPolicyTPAInput('policyTPA'),
            policyInformationUpdatePage.setPolicyInfoGenKeyInput('5'),
        ]);
        const selectedPolicyNewOrExisting = policyInformationUpdatePage.getPolicyNewOrExistingInput();
        if (await selectedPolicyNewOrExisting.isSelected()) {
            await policyInformationUpdatePage.getPolicyNewOrExistingInput().click();
            expect(await policyInformationUpdatePage.getPolicyNewOrExistingInput().isSelected(), 'Expected policyNewOrExisting not to be selected').to.be.false;
        } else {
            await policyInformationUpdatePage.getPolicyNewOrExistingInput().click();
            expect(await policyInformationUpdatePage.getPolicyNewOrExistingInput().isSelected(), 'Expected policyNewOrExisting to be selected').to.be.true;
        }
        expect(await policyInformationUpdatePage.getPolicyNoExistingInput()).to.eq('policyNoExisting', 'Expected PolicyNoExisting value to be equals to policyNoExisting');
        expect(await policyInformationUpdatePage.getInsuranceCompanyExistingInput()).to.eq('5', 'Expected insuranceCompanyExisting value to be equals to 5');
        expect(await policyInformationUpdatePage.getDateOfExpireExistingInput()).to.contain('2001-01-01T02:30', 'Expected dateOfExpireExisting value to be equals to 2000-12-31');
        expect(await policyInformationUpdatePage.getIdvInput()).to.eq('idv', 'Expected Idv value to be equals to idv');
        expect(await policyInformationUpdatePage.getNcbInput()).to.eq('ncb', 'Expected Ncb value to be equals to ncb');
        expect(await policyInformationUpdatePage.getValueOfVichleInput()).to.eq('5', 'Expected valueOfVichle value to be equals to 5');
        expect(await policyInformationUpdatePage.getPurchaseDateInput()).to.contain('2001-01-01T02:30', 'Expected purchaseDate value to be equals to 2000-12-31');
        expect(await policyInformationUpdatePage.getVichleManufCompInput()).to.eq('vichleManufComp', 'Expected VichleManufComp value to be equals to vichleManufComp');
        expect(await policyInformationUpdatePage.getPolicyTPAInput()).to.eq('policyTPA', 'Expected PolicyTPA value to be equals to policyTPA');
        expect(await policyInformationUpdatePage.getPolicyInfoGenKeyInput()).to.eq('5', 'Expected policyInfoGenKey value to be equals to 5');
        await policyInformationUpdatePage.save();
        expect(await policyInformationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await policyInformationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last PolicyInformation', async () => {
        const nbButtonsBeforeDelete = await policyInformationComponentsPage.countDeleteButtons();
        await policyInformationComponentsPage.clickOnLastDeleteButton();

        policyInformationDeleteDialog = new PolicyInformationDeleteDialog();
        expect(await policyInformationDeleteDialog.getDialogTitle())
            .to.eq('insuranceApp.policyInformation.delete.question');
        await policyInformationDeleteDialog.clickOnConfirmButton();

        expect(await policyInformationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
