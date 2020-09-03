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
    console.log('got Login request, path: ' + req.url)
    console.log('uid: ' + req.body.uid + ", pwd: " + req.body.pwd)

    if(req.body.uid && req.body.pwd) {
        res.render("../html/html/home.html", {
            message:"Hi, " + req.body.uid
        })
    }
    else {
        res.render("../html/html/home.html", {
            message:"Login error, try again :)"
        })
    }
})

app.listen(3000,function(){
    console.log("running....");
})