# TL;DR
 Teaching materials of "Fundamendals of Information Technology", class of Keio University

# How to use evaluate tools
## install dependencies
```bash
npm install puppeteer
npm install dateformat
```

## create tools/config.json
```json
{
    "users": [
      "sakitsu",
      "t09415is"
  ]
}
```
define all student's login name in object "users" as list

## exectute
```bash
node evalutate02.js
```

## check result
```bash
cd ./work/02_HTML/yyyy-mm-dd HHMMss/
ls -la
```
results will be found here
