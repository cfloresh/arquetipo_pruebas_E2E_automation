import { test, expect } from '@playwright/test'



test('LOGIN POAGINA DE PRUEBAS', async ({ page }) => {
  await page.goto('/v1/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Swag Labs')
  await page.locator('#user-name').fill("standard_user") /*por id */
  await page.locator('//*[@id="password"]').fill("secret_sauce") /*por xpaht */
  await page.locator('#login-button').click() /*por id */
  // Realiza un desplazamiento hacia abajo
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });

  await page.locator("//div[contains(text(),'Sauce Labs Onesie')]").click()
  /*creacion de assert */
  const costoProducto = await page.locator("//*[@id='inventory_item_container']/div/div/div/div[3]").textContent() /*de ese localizador deme el contenido*/
  console.log(costoProducto)
  const btn_dosplay = await page.locator("//button[contains(text(),'ADD TO CART')]").textContent()
  console.log(btn_dosplay)
  //await expect(page.locator("//button[contains(text(),'ADD TO CART')]")).toBeHidden()/*aqui pongo un assert para ver si el elemento es visible */
  /*si deseo oculto toBeHidden() */
  expect(costoProducto).toEqual("$7.99") /*valido que el precio sea igual a 7.99 */
  await page.pause()


});