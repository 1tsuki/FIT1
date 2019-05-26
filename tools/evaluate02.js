const Evaluator = require("./lib/evaluator");
const fs = require('fs');
const students = JSON.parse(fs.readFileSync('.config.json', 'utf8'));

// surpress warnings
process.setMaxListeners(0);

// create export dir
const evaluator = new Evaluator(students, '02_HTML');
evaluator.evaluate('ex02-5', 'html', async function(page) {
    const errors = [];
    if (await page.$("sup") == null) errors.push("<sup> not found");
    if (await page.$("b") == null
        && await page.$("strong") == null
        && await page.$("span[style='font-weight:bold']") == null
        && await page.$("h4") == null) errors.push("<b> nor <strong> found");
    if (await page.$("s") == null
        && await page.$("strike") == null
        && await page.$("del") == null) errors.push("<s> nor <strike> nor <del> found");
    if (await page.$("bdo[dir='rtl']") == null) errors.push("<bdo dir='rtl'> not found");
    return errors;
});

evaluator.evaluate('ex02-6', 'html', async page => {
    const errors = [];
    if (await page.$("input[type='checkbox']") == null) errors.push("<input type='checkbox'> not found");
    if (await page.$("input[type='password']") == null) errors.push("<input type='password'> not found");
    if (await page.$("input[type='number']") == null) errors.push("<input type='number'> not found");
    if (await page.$("input[type='button']") == null && await page.$("button") == null) errors.push("<input type='button'> nor <buttonL> found");
    return errors;
});
