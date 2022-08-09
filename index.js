const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const cors = require("cors")

app.use(cors())


// setup boilerplate
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize puppeteer function
(async () => {
	// launch headless browser
	const browser = await puppeteer.launch({ headless: true, args: [ '--no-sandbox' ] });

	app.post('/api', (req, res) => {
			if (req.body.html && req.body.css) {
				// generate image function
				(async () => {
					// open new browser page
					const page = await browser.newPage();
					// fill content with user submitted html and css
					await page.setContent(
						`<style>
							${req.body.css}
						</style>
						<div style="height: 720px; width: 1280px">
							${req.body.html}
						</div>`
					);
					// define content area to take screenshot
					const content = await page.$('div');
					// take screenshot in content area, save buffer
					const buffer = await content.screenshot({ type: 'png' });
					// close browser page
					await page.close();
					// send back base64 string of image
					res.status(200).send('data:image/png;base64,' + buffer.toString('base64'))
				})()
			} else {
				// if fields missing
				res.status(400).send('Some fields are missing with request.');
			}
	})
})()

// listen to port
const PORT = 3000
app.listen(PORT, () => console.log('Server started and running on port ' + PORT))