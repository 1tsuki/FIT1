const fs = require('fs-extra');
const dateformat = require('dateformat');
const puppeteer = require('puppeteer');

module.exports = class Evaluator {
  constructor(students, lesson, workDir = 'work') {
    this.students = students;
    this.executedAt = new Date();
    this.baseDir = `${workDir}/${lesson}/${dateformat(this.executedAt, 'yyyy-mm-dd HHMMss')}`;
    fs.mkdirsSync(this.baseDir);
  }

  async evaluate(taskId, extension, evaluator) {
    let browser = null;

    try {
      browser = await puppeteer.launch({headless: true});
      for (let student of this.students) {
        const page = await browser.newPage();

        // load and save html source
        const response = await page.goto(`http://web.sfc.keio.ac.jp/~${student}/FIT1/${taskId}.${extension}`);
        const document = await page.evaluate(() => document.documentElement.outerHTML);
        this.writeFile(`${this.baseDir}/${student}/`, `${taskId}.${extension}`, document);

        // evaluate contents
        let errors = [];
        if (200 > response.status() || 300 <= response.status()) {
          errors.push("Invalid status code: " + response.status())
        } else {
          const result = await evaluator(page);
          errors.push(...result);
        }


        if (errors.length > 0) {
          this.writeFile(`${this.baseDir}/${student}/`, `${taskId}.${extension}.log`, errors);
          console.log(`${student} : ${taskId} ... ${errors}`);
        } else {
          console.log(`${student} : ${taskId} ... OK`);
        }
        if (page) await page.close();
      }
    } catch(e) {
      console.error (e);
    } finally {
      if (browser) await browser.close();
    }
  }

  writeFile(dir, filename, body) {
    fs.mkdirsSync(dir);
    fs.writeFileSync(`${dir}/${filename}`, body);
  }
}
