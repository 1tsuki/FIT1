const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '03_web');
evaluator.evaluate('ex03-7', 'html', async function(page) {
  const errors = [];
  if (await page.$("a") == null) errors.push("<a>not found");
  if (await page.$("ul") == null) errors.push("<ul> not found");
  if (await page.$("li") == null) errors.push("<li> found");
  return errors;
});



