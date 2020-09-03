var express =require("express");
var bodyParser = require('body-parser');
var querystring = require('querystring');

var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));
/* 创建服务器 */

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    console.log('got request, path: ' + req.url)
    console.log('got request, body: ' + req.body)
    res.send(req.body);
})

app.listen(3000,function(){
    console.log("running....");
})