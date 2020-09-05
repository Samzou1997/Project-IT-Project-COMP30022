var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');

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
app.use(cookieParser())

/* 接受请求并反馈数据渲染到界面*/

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

app.listen(3001,function(){
    console.log("running....");
})