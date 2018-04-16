const fs = require('fs');
const shell = require('shelljs');
const dateformat = require('dateformat');

const rootDirName = 'work';

var tools = {
  // create work dir
  createWorkDirSync: function(lessonName) {
    const execDateTime = dateformat(new Date(), 'yyyy-mm-dd HHMMss');
    const path = rootDirName + "/" + lessonName + "/" + execDateTime + "/";
    tools.makeDirByPathSync(path);

    return path;
  },

  // create directory if not exists
  makeDirByPathSync: function(path) {
    shell.mkdir('-p', path);
  },

  // write body to file at path
  writeFile: function(path, body) {
    fs.writeFile(path, body, (err) => {
      if(err){
        console.log("エラーが発生しました。" + err)
        throw err
      }
    });
  }
}
module.exports = tools;
