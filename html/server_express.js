var express =require("express");
var bodyParser = require('body-parser');
var querystring = require('querystring');
var _dir = "/home/IT_Project"

var app = express();

app.engine("html",require("express-art-template"));

app.use(bodyParser.urlencoded({
    extended:true
}));

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    console.log('got Login request, path: ' + req.url)
    console.log('uid: ' + req.body.uid + ", pwd: " + req.body.pwd)

    if(req.body.uid && req.body.pwd) {
        res.render("home.html", {
            message:"Hi, " + req.body.uid
        })
    }
    else {
        res.render("home.html", {
            message:"Login error, try again :)"
        })
    }
})

app.get("/Login", function(req, res){
    res.render("home.html", {
        message:"Login error, try again :)"
    })
})

app.listen(3000,function(){
    console.log("running....");
})