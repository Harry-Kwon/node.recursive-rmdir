var fs = require('fs');
var path = require('path');
    

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
var rmdirSync= function (directory){
  console.log('recursively removing directory: ' + directory);

  files = fs.readdirSync(directory);
  
  for(const file of files){
    let filePath = path.join(directory, file);
    console.log(filePath);
    let stats = fs.statSync(filePath);
    if(stats.isDirectory()){
      rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
  fs.rmdirSync(directory);
  console.log('recusively removed directory: ' + directory);
}

//create test directory
try {
  fs.mkdirSync('foo');
  fs.mkdirSync('./foo/bar');
  fs.writeFileSync('./foo/bar/baz.txt', 'yellow submarine');
  rmdirSync('foo');
} catch(e) {
    //
}

module.exports.rmdirSync = rmdirSync;
