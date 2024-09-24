import webdriver, { By } from "selenium-webdriver"
import { createDriver, focusWindow, takeScreenshot } from "./driver"
async function main() {
	const driver = await createDriver({ loadExtensions: true })

	// getting to the popup page of the extension
	await driver.get("chrome-extension://mmeaokbgfdlacpgjbbbpkmbhbfilepcf/popup.html")
	await driver.sleep(500)
	await takeScreenshot(driver)
	// interacting with it
	await driver.findElement({ id: "applyComicSans" }).click()

	await driver.sleep(500)
	await driver.get("https://www.google.com?hl=en")
	await driver.findElement(By.xpath(`//div[text()="Accept all"]`)).click()
	await driver.findElement({ name: "q" }).click()
	await driver.findElement({ name: "q" }).sendKeys("pkunv github", webdriver.Key.RETURN)
	await driver.findElement(By.xpath(`//h3[text()="Piotr Kuncy pkunv"]`)).click()
	await driver.sleep(500)

	await takeScreenshot(driver)

	await driver.sleep(500)

	await driver.get("https://www.proginosko.com/test/WindowFocusEvents.html")
	await driver.sleep(500)

	await focusWindow(driver)

	await takeScreenshot(driver)
	/*
	await driver.get("https://www.instagram.com")
	await driver.findElement(By.xpath(`//button[text()="Zezwól na wszystkie pliki cookie"]`)).click()
	await driver.sleep(500)
	await takeScreenshot(driver)

	await loadCookies(driver, "cookies/www.instagram.com.cookies.json")
	await driver.sleep(500)
	await driver.get("https://www.instagram.com/direct/inbox/")
	await driver.sleep(5000)
	await takeScreenshot(driver)
	*/

	await driver.close()
	await driver.quit()
}

main()
