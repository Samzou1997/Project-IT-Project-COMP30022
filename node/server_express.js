var express =require("express");
var bodyParser = require('body-parser');
var xml2json=require('xml2json');

var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));
/* 创建服务器 */

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    req.rawBody = '';//添加接收变量
    var json={};
    req.setEncoding('utf8');

    req.on('data', function(chunk) { 
        req.rawBody += chunk;
    });

    req.on('end', function() {
        json=xml2json.toJson(req.rawBody);
        res.send(JSON.stringify(json));
    }); 
})

app.listen(6767,function(){
    console.log("running....");
})