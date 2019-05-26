const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '04_css');
evaluator.evaluate('ex04-8', 'html', async function(page) {
  const errors = [];
  if (await page.$("link") == null) errors.push("<link> not found");
  if (await page.$("table") == null) errors.push("<table> not found");
  if (await page.$("tr") == null) errors.push("<td> not found");
  if (await page.$("th") == null) errors.push("<th> not found");
  if (await page.$("td") == null) errors.push("<td> not found");
  return errors;
});

evaluator.evaluate('mystyle', 'css', async function(page) {
  return [];
});