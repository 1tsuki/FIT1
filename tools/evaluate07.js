const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '07_if');
evaluator.evaluate('ex07-2', 'html', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});

evaluator.evaluate('ex07-2', 'js', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});

evaluator.evaluate('ex07-4', 'html', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});

evaluator.evaluate('ex07-4', 'js', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});
evaluator.evaluate('ex07-10', 'html', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});

evaluator.evaluate('ex07-10', 'js', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});


evaluator.evaluate('ex07-12', 'html', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});

evaluator.evaluate('ex07-12', 'js', async function(page) {
  const errors = [];
  let text = await page.evaluate(() => document.documentElement.outerHTML);

  if (!text) {
    errors.push("text not found");
  }
  return errors;
});
