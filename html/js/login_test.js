var http = require('http');
var querystring = require('querystring');
 
var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="uid"><br>' +
    '网站 URL： <input name="pwd"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';
 
var server = http.createServer(function (req, res) {
    //暂存请求体信息
    var body = "";
 
    //请求链接
    console.log(req.url);
 
    //每当接收到请求体数据，累加到post中
    req.on('data', function (chunk) {
        body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        console.log("chunk:",chunk);
    });
 
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);  //将一个字符串反序列化为一个对象
        console.log("body:",body);
        // 设置响应头部信息及编码\<br><br>      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        if(body.uid && body.pwd) { // 输出提交的数据
          res.write("userID: " + body.uid);
          res.write("<br>");
          res.write("Password: " + body.pwd);
        } 
        else {  // 输出表单
          res.write(postHTML);
        }
      res.end();
  });
}).listen(6767, function () {
    console.log("Server on")
});

server.on('request', function (request, response) {
    console.log('got request, path: ' + request.url)
    // fs.readFile("."+request.url, 'utf-8', function (err, data) {
    //   var pathname = url.parse(request.url).pathname
    //   var ext = pathname.match(/(\.[^.]+|)$/)[0]
    //   if (err) {
    //     response.setHeader('Content-Type', 'text/plain; charset=utf-8')
    //     response.end('File error')
    //   }
    //   else {
    //     switch(ext) {
    //       case ".html":
    //         response.setHeader('Content-Type', 'text/html; charset=utf-8')
    //         break
    //       case ".css":
    //         response.setHeader('Content-Type', 'text/css; charset=utf-8')
    //         break
    //       case ".jpg":
    //         response.setHeader('Content-Type', 'image/jpeg')
    //         break
    //       default:
    //         response.setHeader('Content-Type', 'image/jpeg')
    //     }
    //     response.end(data)
    //   }
    // })
  })