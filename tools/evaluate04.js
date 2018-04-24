const puppeteer = require("puppeteer");
const tools = require("./tools");

// surpress warnings
process.setMaxListeners(0);

// create export dir
const workDir = tools.createWorkDirSync("04_contents", process.argv[2]);

// evaluate files for each users
const config = require("./config.json");
config.users.forEach(function(userId, index, array) {
  console.log(userId);
  // evaluate03_7(userId);
});

function evaluate03_7(userId) {
  const taskId = "ex03-7"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/ex03/report.html";
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
      if (await page.$("p") == null) errors.push("<p> not found");
      if (await page.$("br") == null) errors.push("<br> found");
      if (await page.$("a") == null) errors.push("<a>not found");
      if (body.length < 400) errors.push("report is too short");
    }

    browser.close();

    // output result
    if (errors.length > 0) {
      tools.writeFile(resultPath + ".fail", errors);
    } else {
      console.log(userId + " passed " + taskId)
    }
  })();
}
