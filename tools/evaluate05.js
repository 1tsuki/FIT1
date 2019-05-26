const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '05_script');
evaluator.evaluate('ex05-13', 'html', async function(page) {
  const errors = [];
  let body = await page.$eval('body', (element) => {
    return element.innerHTML
  });

  if (!body) {
    errors.push("body not found");
  } else {
    if (!body.includes("ondblclick")) errors.push("no dblclickevent found");
    if (!body.includes("mouse")) errors.push("no mouseevent found");
  }
  return errors;
});
