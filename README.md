### recursive-rmdir

## Description

Removes a directory and all its child directories and contained files recursively.

Effectively identical to the "rm -rf" command.

---

## Usage

Require the module using
```
var rmdir = require('rmdir');
```

**rmdir(path, [callback]);

### Arguments
>path
```
type: String
desc: Path of the directory to be removed
```

>callback
```
type: Function
desc: Callback to be called after files are removed
arguments: None
```