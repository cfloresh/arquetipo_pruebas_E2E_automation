import { test, expect } from '@playwright/test'

/*uso de promesas, va esperar hasta que de clic en el hipervinculo y abra otra pagina la promesa hara q interactue */
/*con la otra pagina */

test('uso de promesas', async ({ page }, testInfo) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle('OrangeHRM')
  /*primera forma */
  //await page.screenshot({path: 'screenshot/captura1.png' ,fullPage:true }) /* almacena la imagen en la carpeta screenshot */

  /*segunda forma agregar las imagenes al informe creo el testInfo */
  await testInfo.attach ('pagina1', {
    body: await page.screenshot(),
    contentType: 'image/png'
  })

  const [otherpage] = await Promise.all(
    [
      page.waitForEvent('popup'),
      page.locator("//*[@id='app']/div[1]/div/div[1]/div/div[2]/div[3]/div[2]/p[2]/a").click()
    ]
  ) 
  await otherpage.waitForLoadState() 
  await expect (otherpage).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM') 
  const validarOtherPage = await otherpage.locator("//h1[contains(text(), 'Streamline All Your HR Needs on One')]").textContent() 
  console.log(validarOtherPage)
  expect (validarOtherPage).toContain("Streamline All Your HR Needs on One")
  //await otherpage.screenshot({path: 'screenshot/captura2.png', fullPage:true}) /* almacena la imagen en la carpeta screenshot  aqui pongo other page porq ya esta apuntando a la otra pagina*/
    await testInfo.attach ('pagina2', {
    body: await otherpage.screenshot(),
    contentType: 'image/png'
  })
  await otherpage.pause()
});

/*para grabar video en el playwright config poner video=on */