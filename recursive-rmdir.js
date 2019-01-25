var fs = require('fs');

//create test directory
fs.mkdirSync('foo');
fs.mkdirSync('./foo/bar');
fs.writeFileSync('./foo/bar/baz.txt', 'yellow submarine');

/*
//unsync draft, need semaphore?
function recursiveRmdir(directory){
  console.log('recursively removing directory: ' + directory);
  //fs.readdir lists all files in directory
  fs.readdir(directory, function(err, files){
    for(const file of files){
      let filePath = path.join(directory, file);
      fs.stat(filePath, function(err, stats){
        if(stats.isDirectory()){
          //recursively remove directory
          recursiveRmdir(filePath);
        } else {
          //remove file
          console.log('removing file: ' + filePath);
          fs.unlink(filePath, function(err) {
          	console.log('removed file: ' + filePath);
          });
        }
      });
    }
  });
}
*/

//synchronous recusiveRmdir
var recursiveRmdirSync = function (directory){
  console.log('recursively removing directory: ' + directory);
  
  fs.readdir(directory, function(err, files){
    for(const file of files){
      let filePath = path.join(directory, file);
      let stats = fs.statSync(filePath);
      if(stats.isDirectory()){
        recusiveRmdir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });
  console.log('recusively removed directory: ' + directory);
}

module.exports.recursiveRmdirSync = recursiveRmdirSync;