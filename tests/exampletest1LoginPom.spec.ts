import { test, expect } from '@playwright/test'
import { LoginPageClass } from '../pageobject/LoginPage'
import { CompraProcesoClass } from '../pageobject/CompraProceso'
import { lecturaExcelData } from '../pageobject/lecturaDatos'



test('LOGIN FAIL',  { tag: ['@regresion', '@LoginFail'] },async ({ page } ,testInfo ) => {
     // Cargar datos de Excel antes de la prueba
    const datosexcel = await lecturaExcelData('test1', 2)
    await page.goto('/v1/')
    await expect(page).toHaveTitle('Swag Labs')
    const loginPageInterface = new LoginPageClass(page)
    const pcinterface = new CompraProcesoClass(page)
    await loginPageInterface.loginPageNOk(datosexcel[1],datosexcel[2],testInfo)

});



test('LOGIN OK',  { tag: ['@regresion', '@LoginOK'] },async ({ page } ,testInfo ) => {
      const datosexcel = await lecturaExcelData('test3', 2)
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(datosexcel[1],datosexcel[2],testInfo)

});


test('PROCESO DE COMPRA',  { tag: ['@regresion', '@ProcesoCompra'] },async ({ page } ,testInfo ) => {
      const datosexcel = await lecturaExcelData('test2', 2)
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(datosexcel[4],datosexcel[5],testInfo)
      await pcinterface.procesocompra(datosexcel[1],datosexcel[2],datosexcel[3], testInfo)
});

