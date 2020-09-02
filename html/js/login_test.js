var http = require('http');
var querystring = require('querystring');
var fs = require('fs')
 
var server = http.createServer(function (req, res) {
    //暂存请求体信息
    var body = "";
 
    //请求链接
    //console.log(req.url);
 
    //每当接收到请求体数据，累加到post中
    req.on('data', function (chunk) {
        body += chunk;  //一定要使用+=，如果body=chunk，因为请求favicon.ico，body会等于{}
        //console.log("chunk:",chunk);
    });
 
    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function () {
      // 解析参数
      body = querystring.parse(body);  //将一个字符串反序列化为一个对象
      console.log("body:",body);

      var data = fs.readFileSync("/home/IT_Project/html/html/home.html", 'utf-8').toString()

      if(body.uid && body.pwd) {
        data = data.replace('$$message$$', 'Hi, ' + body.uid)
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      } 
      else {
        data = data.replace('$$message$$', 'Login error, try again.')
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(data)
      }
  });
}).listen(6767, function () {
    console.log("Port 6767 is listening...")
});

server.on('request', function (request, response) {
    console.log('got request, path: ' + request.url)
})