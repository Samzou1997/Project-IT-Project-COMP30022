const path            = require('path');
const fs              = require('fs');

function getFileCount(path) {
  fs.readdir(path, function(err, files_list){
    return files_list.length;
  });
}

module.exports = {
  getFileCount
}