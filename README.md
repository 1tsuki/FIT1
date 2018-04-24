# TL;DR
 Teaching materials of "[Fundamendals of Information Technology](https://itclass.sfc.keio.ac.jp/text/info1-2018-4/%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB/)", class of Keio University Shonan Fujisawa Campus.

# How to use evaluating tools
## 1. install dependencies
```bash
npm install puppeteer
npm install dateformat
npm install shelljs
```
Install npm and brew if needed.

## 2. create tools/config.json
Define all student's login name in object "users" as list.
```json
{
    "users": [
      "sakitsu",
      "t09415is"
  ]
}
```

## 3. exectute
Evaluate tool is created for each class. All tools are in tools/ directory.
You can execute tools with following command.

```bash
node evalutate02.js
```
For each execution, the tool will automatically create a directory named with its execution timestamp, and save all crawled contents in it.

you can also specify dir name with args. This will stop the tool to create directories with execution timestamp, and use {dirName} instead of it.
```bash
node evaluate02.js {dirName}
```

if you want to execute recursively, use watch command.

```bash
watch -n 10 "node evaluate02.js {dirName}"
```
Specifying directory name is highly recommended while using watch command.

## check result
```bash
cd ./work/02_HTML/{dirName}/
ls -la
```
results will be found here.

HTML file will be saved for each user if found, .fail file will be created if any error found.
