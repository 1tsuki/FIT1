const fs = require('fs');
const puppeteer = require('puppeteer');
const dateformat = require('dateformat');

// surpress warnings
process.setMaxListeners(0);

// create export dir
const workDirPath = 'work/';
makeDirIfNotExists(workDirPath);
const execDateTime = dateformat(new Date(), 'yyyy-mm-dd HHMMss');
const exportPath = workDirPath + "02_HTML_" + execDateTime + '/';
makeDirIfNotExists(exportPath);

// evaluate files for each users
const config = require('./config.json');
config.users.forEach(function(userid, index, array) {
  const userDir = exportPath + userid + '/';
  makeDirIfNotExists(userDir);

  evaluate02_5(userDir, userid);
  evaluate02_6(userDir, userid);
});






function evaluate02_5(userDir, userid) {
  const jobId = "ex02-5"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userid + "/ex02-5.html";
  const htmlPath = userDir + jobId + '.html';
  const errorPath = userDir + jobId + '_error.log';
  const successPath = userDir + jobId + '_sucess.log';

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load and save html source
    const response = await page.goto(targetUrl);
    const body = await page.evaluate(() => document.body.innerHTML);
    writeFile(htmlPath, body);

    // evaluate contents
    let errors = [];
    if (200 > response.status() || 300 <= response.status()) {
      errors.push("Status code error: " + response.status())
    } else {
      if (await page.$('sup') == null) errors.push("Sup not found");
      if (await page.$('b') == null) errors.push("b not found");
      if (await page.$('s') == null) errors.push("s not found");
      if (await page.$('bdo[dir="rtl"]') == null) errors.push("bdo not found");
    }

    // output result
    if (errors.length > 0) {
      writeFile(errorPath, errors);
    } else {
      writeFile(successPath, "");
    }

    browser.close();
  })();
}

function evaluate02_6(userDir, userid) {
  const jobId = "ex02-6"
  const targetUrl = "http://web.sfc.keio.ac.jp/~" + userid + "/ex02-6.html";
  const htmlPath = userDir + jobId + '.html';
  const errorPath = userDir + jobId + '_error.log';
  const successPath = userDir + jobId + '_sucess.log';

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // load and save html source
    const response = await page.goto(targetUrl);
    const body = await page.evaluate(() => document.body.innerHTML);
    writeFile(htmlPath, body);

    // evaluate contents
    let errors = [];
    if (200 > response.status() || 300 <= response.status()) {
      errors.push("Status code error: " + response.status())
    } else {
      if (await page.$('input[type="text"]') == null) errors.push("checkbox not found");
      if (await page.$('input[type="checkbox"]') == null) errors.push("checkbox not found");
      if (await page.$('input[type="password"]') == null) errors.push("password not found");
      if (await page.$('input[type="number"]') == null) errors.push("number not found");
      if (await page.$('input[type="button"]') == null) errors.push("button not found");
    }

    // output result
    if (errors.length > 0) {
      writeFile(errorPath, errors);
    } else {
      writeFile(successPath, "");
    }

    browser.close();
  })();
}


// create directory if not exists
function makeDirIfNotExists(path) {
  if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
  }
}

// write body to file at path
function writeFile(path, body) {
  fs.writeFile(path, body, (err) => {
    if(err){
      console.log("エラーが発生しました。" + err)
      throw err
    }
  });
}
