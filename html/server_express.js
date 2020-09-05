var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
const jwt = require('jsonwebtoken')

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
    console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")

    let secret_key = "secret"
    let alive_time = 60*60*1
    
    if (req.cookies){
        let req_token = req.cookies.token
        let req_user_id = req.cookies.id
        let req_user_email = req.cookies.email
        jwt.verify(req_token, secret_key, function(error, decoded){
            if (error) {
                console.log("token decode error")
            }
            if (decoded.email === req_user_email && decoded.id === req_user_id){
                res.render('home.html', {
                    username: doc.lastName
                })
            }
            else {
                res.cookie('id', '', { maxAge: 0 })
                res.cookie('email', '', { maxAge: 0 })
                res.cookie('token', '', { maxAge: 0 })
                res.render('index.html', {
                    login_error_message: "Login expired.",
                    register_error_message: ""
                })
            }
        })
    }
    else {
        User.findOne({email: req.body.email}, function(err, doc){
            let user_password = doc.password
            if (err) {
                console.log("db error")
            }
            if (doc) {
                if (user_password === req.body.password){
                    let token = jwt.sign({}, secret_key, {expiresIn: alive_time})
                    let user_email = doc.email
                    let user_id = doc._id
        
                    res.cookie('id', user_id, { maxAge: alive_time })
                    res.cookie('email', user_email, { maxAge: alive_time })
                    res.cookie('token', token, { maxAge: alive_time })
                    res.render('home.html', {
                        username: doc.lastName
                    })
                }
                else{
                    res.render("index.html", {
                        login_error_message: "Incorrect password.",
                        register_error_message: ""
                    })
                }
            }
            else {
                res.render("index.html", {
                    login_error_message: "No user found.",
                    register_error_message: ""
                })
            }
        })
    }
})

app.post("/Register",function(req,res){
    console.log('got Login request, path: ' + req.url)

    if(req.body.first_name && req.body.last_name && req.body.email && req.body.password) {
        
        User.findOne({email: req.body.email}, function(err, doc) {
            if (doc) {
                res.render("index.html", {
                    login_error_message: "",
                    register_error_message: "Email already used."
                })
            }
            else {
                let user = new User({
                    firstName: req.body.first_name,
                    lastName: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                })
                user.save()
                .then(user => {
                    res.render("home.html", {
                        username:"Hi, " + req.body.last_name,
                        message: "Welcome To EPortfolio, start to edit your home page."
                    })
                })
                .catch(error => {
                    console.log(error)
                    res.render("home.html", {
                        message:"Login error, try again :)"
                    })
                })
            }
        })
    }
    else {
        res.render("index.html", {
            login_error_message: "",
            register_error_message: "Please enter all information."
        })
    }
})

app.get("/Login", function(req, res){
    console.log('got Login request, path: ' + req.url)
    console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")
    let secret_key = "secret"
    let expires = 60*60*1

    if (req.cookies.email){
        let req_token = req.cookies.token
        let req_user_id = req.cookies.id
        let req_user_email = req.cookies.email
        jwt.verify(req_token, secret_key, function(error, decoded){
            if (error) {
                console.log("token decode error")
            }
            if (decoded.email === req_user_email && decoded.id === req_user_id){
                res.render('home.html', {
                    username: doc.lastName
                })
            }
            else {
                res.cookie('id', '', { maxAge: 0 })
                res.cookie('email', '', { maxAge: 0 })
                res.cookie('token', '', { maxAge: 0 })
                res.render('index.html', {
                    login_error_message: "Login expired.",
                    register_error_message: ""
                })
            }
        })
    }
    else{
        res.render("home.html", {
            message:"Login error, try again :)"
        })
    }
})

app.listen(3000,function(){
    console.log("running....");
})