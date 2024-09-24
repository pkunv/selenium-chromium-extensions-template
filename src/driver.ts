import fs from "fs"
import webdriver from "selenium-webdriver"
import { Options } from "selenium-webdriver/chrome.js"
import { env } from "./env"

export async function createDriver(
	{ loadExtensions }: { loadExtensions?: boolean } = {
		loadExtensions: true,
	},
) {
	const extensions = fs
		.readdirSync("extensions")
		.map((file) => fs.realpathSync(`extensions/${file}`))

	const options = new Options()
	options.setBinaryPath(env.CHROME_BIN)
	if (loadExtensions) {
		options.addExtensions(...extensions)
	}
	options.addArguments("--disable-gpu")
	options.addArguments("--headless=new")

	const driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build()
	return driver
}

export async function focusWindow(driver: webdriver.WebDriver) {
	const handle = await driver.getWindowHandle()
	await driver.switchTo().newWindow("tab")
	await driver.get("https://www.google.com")
	await driver.sleep(500)
	await driver.close()
	await driver.switchTo().window(handle)
}

export async function takeScreenshot(driver: webdriver.WebDriver) {
	const screenshot = await driver.takeScreenshot()
	fs.writeFileSync(`screenshots/screenshot-${new Date().getTime()}.png`, screenshot, "base64")
}

export async function loadCookies(driver: webdriver.WebDriver, file: string) {
	const cookiesFile = JSON.parse(fs.readFileSync(fs.realpathSync(file), "utf-8"))

	cookiesFile.forEach(async (cookie: webdriver.IWebDriverOptionsCookie) => {
		await driver.manage().addCookie(cookie)
	})
}

export async function getMemoryUsage(driver: webdriver.WebDriver) {
	const value: number = await driver.executeScript("return window.performance.memory")
	return value / (1024 * 1024)
}
