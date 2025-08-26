import { test, expect } from '@playwright/test'
import { LoginPageClass } from '../pageobject/LoginPage'
import { CompraProcesoClass } from '../pageobject/CompraProceso'

const xlsx = require('xlsx')
const filePath = './data/DataDriven.xlsx'
const workbook = xlsx.readFile(filePath)
const sheetName = 'test1';
const worksheet = workbook.Sheets[sheetName];
const records = xlsx.utils.sheet_to_json(worksheet);
// lee el reglon posterior al encabezado
const datosexcel = records[0]; 



if (!worksheet) {
  throw new Error(`La hoja con nombre "${worksheet}" no existe en el archivo Excel.`);
}

test('LOGIN FAIL',  { tag: ['@regresion', '@LoginFail'] },async ({ page } ,testInfo ) => {
   await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageNOk(datosexcel.user,datosexcel.pass,testInfo)

});


const workbook2 = xlsx.readFile(filePath)
const sheetName2 = 'test3';
const worksheet2 = workbook2.Sheets[sheetName2];
const records2 = xlsx.utils.sheet_to_json(worksheet2);
const datosexcel2 = records2[0]; 

test('LOGIN OK',  { tag: ['@regresion', '@LoginOK'] },async ({ page } ,testInfo ) => {
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(datosexcel2.user,datosexcel2.pass,testInfo)

});



const workbook3 = xlsx.readFile(filePath)
const sheetName3 = 'test2';
const worksheet3 = workbook3.Sheets[sheetName3];
const records3 = xlsx.utils.sheet_to_json(worksheet3);
const datosexcel3 = records3[0]; 

test('PROCESO DE COMPRA',  { tag: ['@regresion', '@ProcesoCompra'] },async ({ page } ,testInfo ) => {
  await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(datosexcel3.user,datosexcel3.pass,testInfo)
      await pcinterface.procesocompra(datosexcel3.firstName, datosexcel3.lastName, datosexcel3.postalCode, testInfo)
});

