const puppeteer = require("puppeteer");
const tools = require("./tools");

// surpress warnings
process.setMaxListeners(0);

// create export dir
const workDir = tools.createWorkDirSync("05_script", process.argv[2]);

// evaluate files for each users
const config = require("./config.json");
console.log("今回は提出内容の自動確認ができません。提出ファイルの存在のみを確認しています。")
// config.users.forEach(function(userId, index, array) {
["sakitsu"].forEach(function(userId, index, array) {
  ["ex05-11", "ex05-12", "ex05-13"].forEach(
    function(taskId, index, array) {
      evaluate05(userId, taskId);
  });
});

function evaluate05(userId, taskId) {
  const htmlUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/" + taskId + ".html";
  const jsUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/" + taskId + ".js";

  (async () => {
    // initialize puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('response', async (response) => {
      // const url = new URL(response.url());
      // let filePath = path.resolve(`${url.pathname}`);
      // console.log(filePath);
      // if (path.extname(url.pathname).trim() === '') {
      //   filePath = `${filePath}/index.html`;
      // }
      if (200 > response.status() || 300 <= response.status()) {
        console.log(url.pathname + " not found");
      } else {
        await console.log(await response.buffer());
        // await fse.outputFile(filePath, await response.buffer());
      }
    });

    await page.goto(htmlUrl);
    await page.goto(jsUrl);
  })();
}
