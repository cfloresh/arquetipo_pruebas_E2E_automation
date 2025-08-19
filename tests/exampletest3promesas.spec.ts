import { test, expect } from '@playwright/test'

/*uso de promesas, va esperar hasta que de clic en el hipervinculo y abra otra pagina la promesa hara q interactue */
/*con la otra pagina */

test('uso de promesas', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('OrangeHRM') /*assert para validar titulo de pestaña  */
  

  const [otherpage] = await Promise.all(
    [
      page.waitForEvent('popup'),
      page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[3]/div[2]/p[2]/a").click()
    ]
  ) 

  await otherpage.waitForLoadState() /*espera a que cargue la otra pagina posterior a la promesa */
  await expect (otherpage).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM') /*valido q cargo */
  const validarOtherPage = await otherpage.locator("//h1[contains(text(), 'Streamline All Your HR Needs on One')]").textContent() //con esta constante verifico que se haya abierto la pagina validando un texto del dom
  console.log(validarOtherPage)
  expect (validarOtherPage).toContain("Streamline All Your HR Needs on One") /*mando el expect validando el texto anterior */
  await page.pause()
});