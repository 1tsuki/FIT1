const puppeteer = require("puppeteer");
const tools = require("./tools");

// surpress warnings
process.setMaxListeners(0);

// create export dir
const workDir = tools.createWorkDirSync("02_HTML");

// evaluate files for each users
const config = require("./config.json");
config.users.forEach(function(userId, index, array) {
  evaluate02_5(userId);
  evaluate02_6(userId);
});

function evaluate02_5(userId) {
  const taskId = "ex02-5"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/ex02-5.html";
  const htmlPath = workDir + userId + "_" + taskId + ".html";
  const resultPath = workDir + userId + "_" + taskId + ".log";

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load and save html source
    const response = await page.goto(targetUrl);
    const body = await page.evaluate(() => document.body.innerHTML);
    tools.writeFile(htmlPath, body);

    // evaluate contents
    let errors = [];
    if (200 > response.status() || 300 <= response.status()) {
      errors.push("Invalid status code: " + response.status())
    } else {
      if (await page.$("sup") == null) errors.push("<sup> not found");
      if (await page.$("b") == null) errors.push("<b> not found");
      if (await page.$("s") == null) errors.push("<s> not found");
      if (await page.$("bdo[dir='rtl']") == null) errors.push("<bdo dir='rtl'> not found");
    }
    browser.close();

    // output result
    if (errors.length > 0) {
      tools.writeFile(resultPath + ".fail", errors);
    } else {
      tools.writeFile(resultPath + ".success", "success");
    }
  })();
}

function evaluate02_6(userId) {
  const taskId = "ex02-6"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/ex02-6.html";
  const htmlPath = workDir + userId + "_" + taskId + ".html";
  const resultPath = workDir + userId + "_" + taskId + ".log";

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load and save html source
    const response = await page.goto(targetUrl);
    const body = await page.evaluate(() => document.body.innerHTML);
    tools.writeFile(htmlPath, body);

    // evaluate contents
    let errors = [];
    if (200 > response.status() || 300 <= response.status()) {
      errors.push("Status code error: " + response.status())
    } else {
      if (await page.$("input[type='text']") == null) errors.push("<input type='text'> not found");
      if (await page.$("input[type='checkbox']") == null) errors.push("<input type='checkbox'> not found");
      if (await page.$("input[type='password']") == null) errors.push("<input type='password'> not found");
      if (await page.$("input[type='number']") == null) errors.push("<input type='number'> not found");
      if (await page.$("input[type='button']") == null && await page.$("button") == null) errors.push("<input type='button'> nor <buttonL> found");
    }
    browser.close();

    // output result
    if (errors.length > 0) {
      tools.writeFile(resultPath + ".fail", errors);
    } else {
      tools.writeFile(resultPath + ".success", "success");
    }
  })();
}
