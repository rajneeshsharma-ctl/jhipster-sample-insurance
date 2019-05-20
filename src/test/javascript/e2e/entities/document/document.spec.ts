/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentComponentsPage, DocumentDeleteDialog, DocumentUpdatePage } from './document.page-object';

const expect = chai.expect;

describe('Document e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentUpdatePage: DocumentUpdatePage;
  let documentComponentsPage: DocumentComponentsPage;
  /*let documentDeleteDialog: DocumentDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Documents', async () => {
    await navBarPage.goToEntity('document');
    documentComponentsPage = new DocumentComponentsPage();
    await browser.wait(ec.visibilityOf(documentComponentsPage.title), 5000);
    expect(await documentComponentsPage.getTitle()).to.eq('insuranceApp.document.home.title');
  });

  it('should load create Document page', async () => {
    await documentComponentsPage.clickOnCreateButton();
    documentUpdatePage = new DocumentUpdatePage();
    expect(await documentUpdatePage.getPageTitle()).to.eq('insuranceApp.document.home.createOrEditLabel');
    await documentUpdatePage.cancel();
  });

  /* it('should create and save Documents', async () => {
        const nbButtonsBeforeCreate = await documentComponentsPage.countDeleteButtons();

        await documentComponentsPage.clickOnCreateButton();
        await promise.all([
            documentUpdatePage.setTitleInput('title'),
            documentUpdatePage.setSizeInput('5'),
            documentUpdatePage.setMimeTypeInput('mimeType'),
            documentUpdatePage.contentSelectLastOption(),
            documentUpdatePage.insuranceFormSelectLastOption(),
        ]);
        expect(await documentUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await documentUpdatePage.getSizeInput()).to.eq('5', 'Expected size value to be equals to 5');
        expect(await documentUpdatePage.getMimeTypeInput()).to.eq('mimeType', 'Expected MimeType value to be equals to mimeType');
        await documentUpdatePage.save();
        expect(await documentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Document', async () => {
        const nbButtonsBeforeDelete = await documentComponentsPage.countDeleteButtons();
        await documentComponentsPage.clickOnLastDeleteButton();

        documentDeleteDialog = new DocumentDeleteDialog();
        expect(await documentDeleteDialog.getDialogTitle())
            .to.eq('insuranceApp.document.delete.question');
        await documentDeleteDialog.clickOnConfirmButton();

        expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
