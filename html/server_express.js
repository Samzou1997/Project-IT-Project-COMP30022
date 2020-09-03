var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');

mongoose.connect('mongodb://localhost:27017/GeekDB', {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

var app = express();

app.engine("html",require("express-art-template"));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.jason())

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    console.log('got Login request, path: ' + req.url)
    console.log('request body: { uid: ' + req.body.uid + ", pwd: " + req.body.pwd + " }")

    if(req.body.uid && req.body.pwd) {
        res.render("test_home.html", {
            username:"Hi, " + req.body.uid
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