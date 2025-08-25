import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';  
import { LoginPageClass } from '../pageobject/LoginPage';
import { CompraProcesoClass } from '../pageobject/CompraProceso';

const excelFilePath = path.join(__dirname, '../data/DataDriven.xlsx');
const fileBuffer = fs.readFileSync(excelFilePath);
const workbook = XLSX.read(fileBuffer, { type: 'buffer' });


/*test login FAIL */
// Obtener hoja por nombre
const sheetName2 = 'test1';  // nombre exacto de la hoja
const worksheet2 = workbook.Sheets[sheetName2];

if (!worksheet2) {
  throw new Error(`La hoja con nombre "${sheetName2}" no existe en el archivo Excel.`);
}
const testData2: any[] = XLSX.utils.sheet_to_json(worksheet2, { defval: '' });
test.describe('TEST 001 LOGIN FAIL', () => {
  for (const data of testData2) {
    test(`INPUT DATOS: ${data.user} ${data.pass}`, { tag: ['@regresion', '@LoginFail'] }, async ({ page }, testInfo) => {
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageNOk(data.user,data.pass,testInfo)
    });
  }
});




/*test login OK */
// Obtener hoja por nombre
const sheetName3 = 'test3';  // nombre exacto de la hoja
const worksheet3 = workbook.Sheets[sheetName3];

if (!worksheet2) {
  throw new Error(`La hoja con nombre "${sheetName3}" no existe en el archivo Excel.`);
}

const testData3: any[] = XLSX.utils.sheet_to_json(worksheet3, { defval: '' });

test.describe('LOGIN SUCCESS', () => {
  for (const data of testData3) {
    test(`INPUT DATOS: ${data.user} ${data.pass}`, { tag: ['@regresion', '@LoginOK'] } , async ({ page }, testInfo) => {
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(data.user,data.pass,testInfo)
    });
  }
});



/*TEST PROCESO DE COMPRA COMPLETO */
// Obtener hoja por nombre
const sheetName = 'test2';  // nombre exacto de la hoja
const worksheet = workbook.Sheets[sheetName];
if (!worksheet) {
  throw new Error(`La hoja con nombre "${sheetName}" no existe en el archivo Excel.`);
}
const testData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
test.describe('FLUJO DE COMPRAS COMPLETO', () => {
  for (const data of testData) {
    test(`INPUT DATOS: ${data.firstName} ${data.lastName} ${data.postalCode} ${data.user} ${data.pass}`, { tag: ['@regresion', '@flujoCompleto'] } , async ({ page }, testInfo) => {
      await page.goto('/v1/')
      await expect(page).toHaveTitle('Swag Labs')
      const loginPageInterface = new LoginPageClass(page)
      const pcinterface = new CompraProcesoClass(page)
      await loginPageInterface.loginPageOk(data.user,data.pass,testInfo)
      await pcinterface.procesocompra(data.firstName, data.lastName, data.postalCode, testInfo)
    });
  }
});


