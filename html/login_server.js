var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
const jwt           = require('jsonwebtoken')
var cookieParser    = require('cookie-parser');
var tokenVerifier   = require('./controllers/TokenVerifier')
//const UserRoute     = require('./routes/user')
const User          = require('./models/User')

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
app.use(cookieParser())

/* 接受请求并反馈数据渲染到界面*/
app.post("/Login",function(req,res){
    console.log('got Login request, path: ' + req.url)
    console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")

    let secret_key = "secret"
    let alive_time = 60*60*24
    
    // if there are cookies included in the request
    if (req.cookies["email"] != null){
        let req_token = req.cookies['token']
        let req_user_id = req.cookies['id']
        let req_user_email = req.cookies['email']

        //verify token
        jwt.verify(req_token, secret_key, function(error, decoded){
            if (error) {
                console.log("token decode error")
                res.cookie('id', '', { maxAge: 0 })
                res.cookie('email', '', { maxAge: 0 })
                res.cookie('token', '', { maxAge: 0 })
                res.render('index.html', {
                    login_error_message: "Login expired.",
                    register_error_message: ""
                })
            }
            //console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
            else {
                res.redirect('http://3.131.49.106/home')
                // User.findOne({email: decoded.user_email}, function(err, doc){
                //     if (err) {
                //         console.log("db error")
                //     }
                //     res.render('home.html', {
                //         username: doc.lastName
                //     })
                // })
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
                    let user_email = doc.email
                    let user_id = doc._id
                    let token = jwt.sign({user_id, user_email}, secret_key, {expiresIn: 300})

                    res.cookie('id', user_id, { maxAge: alive_time })
                    res.cookie('email', user_email, { maxAge: alive_time })
                    res.cookie('token', token, { maxAge: alive_time })
                    res.redirect('http://3.131.49.106/home')
                    // res.render('home.html', {
                    //     username: doc.lastName
                    // })
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

app.get("/Login", function(req, res){
    console.log('got Login request, path: ' + req.url)
    console.log('request body: { email: ' + req.body.email + ", pwd: " + req.body.password + " }")
    let secret_key = "secret"
    let expires = 60*60*1

    if (req.cookies["email"] != null){
        let req_token = req.cookies['token']
        let req_user_id = req.cookies['id']
        let req_user_email = req.cookies['email']

        // verify token
        jwt.verify(req_token, secret_key, function(error, decoded){
            if (error) {
                console.log("token decode error")
                res.cookie('id', '', { maxAge: 0 })
                res.cookie('email', '', { maxAge: 0 })
                res.cookie('token', '', { maxAge: 0 })
                res.render('index.html', {
                    login_error_message: "Login expired.",
                    register_error_message: ""
                })
            }
            //console.log('decode: ' + decoded.user_email + ' ' + decoded.user_id)
            else {
                User.findOne({email: decoded.user_email}, function(err, doc){
                    if (err) {
                        console.log("db error")
                    }
                    res.render('home.html', {
                        username: doc.lastName
                    })
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

app.listen(3002,function(){
    console.log("running....");
})