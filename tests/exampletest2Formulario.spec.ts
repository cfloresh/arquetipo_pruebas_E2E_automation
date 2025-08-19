import { test, expect } from '@playwright/test'



test('formulario de registro netlife', async ({ page }) => {
  await page.goto('https://www.netlife.ec/atencion-al-cliente/consultas-tecnicas/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Consultas técnicas - Netlife | Netlife')
  await page.locator('#wpforms-2350-field_17').scrollIntoViewIfNeeded()
  await page.locator('#wpforms-2350-field_0').fill("CRISTHIAN FLORES")
  await page.locator('#wpforms-2350-field_1').fill("test@gmail.com")
  await page.locator('#wpforms-2350-field_7').fill("0958951059")
  await page.locator('#wpforms-2350-field_17').fill("1308845260")
  /*aqui listas desplegable */
  await page.locator('#wpforms-2350-field_16').selectOption("El Carmen")
  await page.locator('#wpforms-2350-field_9').selectOption("Facturación")
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
  /*para cargar elementos */
  /*await page.locator('#wpforms-2350-field_9').setInputFiles('tests/exampletest2Formulario.spec.ts') //agreagar el archivo dentro del proyecto*/
  await page.pause()
});