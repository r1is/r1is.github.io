var spawn = require('child_process').exec;

// Hexo 2.x 用户复制这段
// hexo.on('new', function(path){
//   spawn('start  "markdown编辑器绝对路径.exe" ' + path);
// });

// Hexo 3 用户复制这段
hexo.on('new', function(data){
//  Mac
//  spawn('open "/Applications/Typora.app" ' + data.path);
    spawn('start  "D:\Microsoft VS Code\Code.exe" ' + data.path);
});
