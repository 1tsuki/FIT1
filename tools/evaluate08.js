const tools = require("./tools");
const config = require("./config.json");
const http = require('http');
const fs = require('fs');


// create workDir
const workDir = tools.createWorkDirSync("08_data", process.argv[2]);

// loop for users
config.users.forEach(function(userId, i, a) {
  // create userDir
  userDir = workDir + userId + "/";
  tools.makeDirByPathSync(userDir);

  // loop for tasks
  ["ex08-1", "ex08-8", "ex08-9"].forEach(function(taskId, j, b) {
    // loop for file extensions
    [".html", ".js"].forEach(function(extension, k, c) {

      var targetFilePath = userDir + taskId + extension;
      var targetUrl = "http://web.sfc.keio.ac.jp/~" + userId + "/" + taskId + extension;
      var request = http.get(targetUrl, function(response) {
        if (response.statusCode == 200) {
          console.log(userId + ' has already submitted ' + taskId);
          var file = fs.createWriteStream(targetFilePath);
          response.pipe(file);
        }
      });
    });
  });
});
