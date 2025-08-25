import { Locator, Page ,expect } from '@playwright/test'


export class CompraProcesoClass{
    private readonly elementocompra :Locator
    private readonly costoProducto :Locator
    private readonly agregarCarrito  :Locator
    private readonly carritoCompra :Locator
    private readonly btnCheckout :Locator
    private readonly firstName :Locator
    private readonly lastName :Locator
    private readonly postalCode :Locator
    private readonly btncontinue :Locator
    private readonly btnfinish :Locator
    private readonly lblFinal :Locator


    constructor (page :Page){
        this.elementocompra = page.locator("//div[contains(text(),'Sauce Labs Onesie')]")
        this.costoProducto = page.locator("//*[@id='inventory_item_container']/div/div/div/div[3]")
        this.agregarCarrito = page.locator("//button[contains(text(),'ADD TO CART')]")
        this.carritoCompra = page.locator("#shopping_cart_container")
        this.btnCheckout = page.locator("//a[contains(text(),'CHECKOUT')]")
        this.firstName = page.locator("#first-name")
        this.lastName = page.locator("#last-name")
        this.postalCode = page.locator("#postal-code")
        this.btncontinue = page.locator("//*[@id='checkout_info_container']/div/form/div[2]/input")
        this.btnfinish = page.locator("//a[contains(text(),'FINISH')]")
        this.lblFinal = page.locator("//h2[contains(text(),'THANK YOU FOR YOUR ORDER')]")      
        this.page = page;   
    }

    private page: Page;


    async procesocompra(vFirsName:string, vLastName:string, postalCode:string, testInfo: any){
        await this.elementocompra.click()
        await testInfo.attach('pagina2', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.costoProducto.textContent()
        const txtprecio = await this.costoProducto.textContent()
        await expect(txtprecio).toBe("$7.99")
        await testInfo.attach('pagina2_1', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.agregarCarrito.click()
        await this.carritoCompra.click()
        await this.btnCheckout.click()
        await this.firstName.fill(vFirsName)
        await this.lastName.fill(vLastName)
        await this.postalCode.fill(postalCode)
        await testInfo.attach('pagina3', { body: await this.page.screenshot(), contentType: 'image/png' });
        await this.btncontinue.click()
        await this.btnfinish.click()
        await this.lblFinal.textContent()
        await console.log(await this.lblFinal.textContent())
        const txtfinal= await this.lblFinal.textContent()
        expect(txtfinal).toBe("THANK YOU FOR YOUR ORDER")
        await testInfo.attach('pagina4', { body: await this.page.screenshot(), contentType: 'image/png' });
    }
    

}