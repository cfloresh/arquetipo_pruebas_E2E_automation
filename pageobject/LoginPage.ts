import { Locator, Page,expect } from '@playwright/test'

export class LoginPageClass{
    private readonly username :Locator
    private readonly password :Locator
    private readonly loginButton :Locator
    private readonly lblValidacion :Locator


    constructor (page :Page){
        this.username = page.locator("#user-name")
        this.password = page.locator("#password")
        this.loginButton = page.locator("#login-button")
        this.lblValidacion = page.locator("//h3[contains(text(),'Epic sadface: ')]")
        this.page = page; 
    }

    private page: Page;


    async loginPageOk(vUser:string, vPassword:string, testInfo: any){
        await this.username.fill(vUser)
        await testInfo.attach('paginaLoginOk', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.password.fill(vPassword)
        await testInfo.attach('paginaLoginOk2', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.loginButton.click()
        await testInfo.attach('paginaLoginOk3', { body: await this.page.screenshot(), contentType: 'image/png' });
    }

    async loginPageNOk(vUser:string, vPassword:string, testInfo: any){
        await this.username.fill(vUser)
        await testInfo.attach('paginaLoginNOk', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.password.fill(vPassword)
        await testInfo.attach('paginaLoginNOk', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.loginButton.click()
        await console.log(await this.lblValidacion.textContent())
        const lblFinalValidacion= await this.lblValidacion.textContent()
        expect(lblFinalValidacion).toBe("Epic sadface: Username and password do not match any user in this service")
        await testInfo.attach('paginaLoginNOk', { body: await this.page.screenshot(), contentType: 'image/png' });
    }



}