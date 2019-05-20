/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ContentComponentsPage, ContentDeleteDialog, ContentUpdatePage } from './content.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Content e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contentUpdatePage: ContentUpdatePage;
  let contentComponentsPage: ContentComponentsPage;
  /*let contentDeleteDialog: ContentDeleteDialog;*/
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Contents', async () => {
    await navBarPage.goToEntity('content');
    contentComponentsPage = new ContentComponentsPage();
    await browser.wait(ec.visibilityOf(contentComponentsPage.title), 5000);
    expect(await contentComponentsPage.getTitle()).to.eq('insuranceApp.content.home.title');
  });

  it('should load create Content page', async () => {
    await contentComponentsPage.clickOnCreateButton();
    contentUpdatePage = new ContentUpdatePage();
    expect(await contentUpdatePage.getPageTitle()).to.eq('insuranceApp.content.home.createOrEditLabel');
    await contentUpdatePage.cancel();
  });

  /* it('should create and save Contents', async () => {
        const nbButtonsBeforeCreate = await contentComponentsPage.countDeleteButtons();

        await contentComponentsPage.clickOnCreateButton();
        await promise.all([
            contentUpdatePage.setDataInput(absolutePath),
        ]);
        expect(await contentUpdatePage.getDataInput()).to.endsWith(fileNameToUpload, 'Expected Data value to be end with ' + fileNameToUpload);
        await contentUpdatePage.save();
        expect(await contentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await contentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Content', async () => {
        const nbButtonsBeforeDelete = await contentComponentsPage.countDeleteButtons();
        await contentComponentsPage.clickOnLastDeleteButton();

        contentDeleteDialog = new ContentDeleteDialog();
        expect(await contentDeleteDialog.getDialogTitle())
            .to.eq('insuranceApp.content.delete.question');
        await contentDeleteDialog.clickOnConfirmButton();

        expect(await contentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
