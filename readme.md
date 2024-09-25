# Selenium Chrome/Chromium headless mode template

## Overview

- Extension loader (add .crx files to `/extensions`)
- Working headless setup
- Focus function
- Screenshot function
- Cookie loader
- Optional multiple workers by `node:workers_threads`

## Installation:

1. Run `npm i` to install dependencies.

2. Pass your chrome binary path to `.env` file.

3. Load your extensions (.crx files) to `/extensions` path.

4. Run `npm run start` and wait for script execution.

## Signing in by loading cookies

1. Get to the domain of the cookie \
   `await driver.get("https://www.instagram.com")`

2. Load cookie that uses this domain \
   `await loadCookies(driver, "cookies/www.instagram.com.cookies.json")`

3. Let driver sleep for 500 - 2500ms \
   `await loadCookies(driver, "cookies/www.instagram.com.cookies.json")`

4. Get to the domain that needs authorization and check results.
