const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '06_event');
evaluator.evaluate('ex06-11', 'html', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);


  if (!text) {
    errors.push("text not found");
  } else {
    if (!text.includes("img")) errors.push("no img tag found");
    if (!text.includes("script")) errors.push("no script tag found");
  }
  return errors;
});

evaluator.evaluate('ex06-11', 'js', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  } else {
    if (!text.includes("function")) errors.push("no function found");
    if (!text.includes("setTimeout")) errors.push("no setTimeout found");
    if (!text.includes("document.getElementById")) errors.push("no document.getElementById found");
  }
  return errors;
});
