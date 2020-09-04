var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
var MongoClient     = require("mongodb").MongoClient;

//const UserRoute     = require('./routes/user')
const User = require('./models/User')
mongoose.connect('mongodb://testacc:qpzm123456@localhost:27017/GeekDB?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})

var app = express();

//app.use('/Login', UserRoute)
app.engine("html",require("express-art-template"));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    console.log('got Login request, path: ' + req.url)
    console.log('request body: { uid: ' + req.body.uid + ", pwd: " + req.body.pwd + " }")

    if(req.body.uid && req.body.pwd) {
        res.render("home.html", {
            username:"Hi, " + req.body.uid,
            message: "Hello"
        })
    }
    else {
        res.render("home.html", {
            message:"Login error, try again :)"
        })
    }
})

app.post("/Register",function(req,res){
    console.log('got Login request, path: ' + req.url)

    if(req.body.first_name && req.body.last_name && req.body.email && req.body.password) {
        let user = new User({
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            birthDate: req.body.birthday,
            gender: req.body.gender,
            password: req.body.password,
        })
        user.save()
        .then(user => {
            res.render("home.html", {
                username:"Hi, " + req.body.uid,
                message: "Hello"
            })
        })
        .catch(error => {
            console.log(error)
            res.render("home.html", {
                message:"Login error, try again :)"
            })
        })
    }
    else {
        res.render("index.html")
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