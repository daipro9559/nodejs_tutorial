var http = require('http');
var dt = require('./module/my_module.js');
var formodable = require('formidable');
var url = require('url');
var fs = require('fs');
http.createServer(function(req,res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log('start listen!');
  console.log(url.parse(req.url,true).pathname);
  if (url.parse(req.url,true).pathname == '/upload'){
    console.log('start uplpad!');
    res.write('file uploading...');
      var form = new formodable.IncomingForm();
      form.parse(req, function(err,fields,files){
        var oldPath = files.filetoupload.path;
        var newPath = './file/';
        fs.rename(oldPath,newPath,function(err){
          if (err) throw err;
          res.write('file upload completed');
          res.end();
        });
      });
  }
}).listen(8080);