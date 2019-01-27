var fs = require('fs');
var path = require('path');
    

//async rmdir
var rmdir = function(directory, callback) {
  switch(arguments.length){
    case 1: callback=function(){};
  }
  
  console.log('recursively removing directory: ' + directory);
  
  fs.readdir(directory, function(err, files){
    var count=0;
    for(const file of files) {
      count++;
      var on_remove = function(){
        count--;
        console.log(directory + ": " + count);
        if(count === 0) {
        	fs.rmdir(directory, callback);
        }
      }
      
      var filePath = path.join(directory, file);
      console.log(filePath);
      fs.stat(filePath, function(err, stats){
        if(stats.isDirectory()){
          //recursively remove directory
          rmdir(filePath, on_remove);
        } else {
          //remove file
          fs.unlink(filePath, function(err){
            on_remove();
          	console.log('removed file: ' + filePath);
          });
        }
      });
    }
  });
}

/*
//async test
try {
  fs.mkdirSync('foo');
  fs.mkdirSync('./foo/bar');
  fs.writeFileSync('./foo/bar/baz.txt', 'yellow submarine');
  rmdir('foo');
} catch(e) {
  console.log('async test failed');
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

//sync test
/*
try {
  fs.mkdirSync('foo');
  fs.mkdirSync('./foo/bar');
  fs.writeFileSync('./foo/bar/baz.txt', 'yellow submarine');
  rmdirSync('foo');
} catch(e) {
  console.log('sync test failed');
}
*/

module.exports.rmdirSync = rmdirSync;
