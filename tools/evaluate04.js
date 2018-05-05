const puppeteer = require("puppeteer");
const tools = require("./tools");

// surpress warnings
process.setMaxListeners(0);

// create export dir
const workDir = tools.createWorkDirSync("04_css", process.argv[2]);

// evaluate files for each users
const config = require("./config.json");
console.log("今回の課題は教員/SAによる最終確認が必要です")
config.users.forEach(function(userId, index, array) {
  evaluate04(userId);
});

function evaluate04(userId) {
  const taskId = "ex04"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/ex04.html";
  const htmlPath = workDir + userId + "_" + taskId + ".html";
  const resultPath = workDir + userId + "_" + taskId + ".log";

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load and save html source
    const response = await page.goto(targetUrl);
    const body = await page.evaluate(() => document.body.innerHTML);

    // evaluate contents
    let errors = [];
    if (200 > response.status() || 300 <= response.status()) {
      errors.push("Invalid status code: " + response.status())
    } else {
      tools.writeFile(htmlPath, body);

      // check existence of img tag and src
      const imgs = await page.$$eval('img[src]', imgs => imgs.map(img => img.getAttribute('src')));
      if (imgs.length < 1) {
        errors.push("<img> not found");
      } else {
        imgs.forEach(function(src) {
          if (src.startsWith("http://") || src.startsWith("https://")) {
            if (!src.startsWith("http://web.sfc.keio.ac.jp") && !src.startsWith("https://web.sfc.keio.ac.jp")) {
              errors.push("<img> is reffering to other domains contents");
            }
          }
        });
      }

      if (await page.$("link") == null) errors.push("<link> found");
      if (await page.$("table") == null) errors.push("<table> found");
      if (await page.$("tr") == null) errors.push("<td> found");
      if (await page.$("th") == null) errors.push("<th> found");
      if (await page.$("td") == null) errors.push("<td> found");
    }

    browser.close();

    // output result
    if (errors.length > 0) {
      tools.writeFile(resultPath, errors);
    } else {
      console.log(userId + " may have passed " + taskId)
    }
  })();
}
