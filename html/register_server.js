var express         = require("express");
var bodyParser      = require('body-parser');
var querystring     = require('querystring');
var mongoose        = require('mongoose');
var morgan          = require('morgan');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser');
const RegisetRouter     = require('./routes/register')
const User = require('./models/User')

const secret_key = "secret"
const hour = 3600000
const alive_time = hour * 24

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
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/Register', RegisetRouter)

/* 接受请求并反馈数据渲染到界面*/

// app.post("/Register",function(req,res){
//     console.log('got register request, path: ' + req.url)

//     if(req.body.first_name && req.body.last_name && req.body.email && req.body.password) {
        
//         User.findOne({email: req.body.email}, function(err, doc) {
//             if (doc) {
//                 res.render("index.html", {
//                     login_error_message: "",
//                     register_error_message: "Email already used."
//                 })
//             }
//             else {
//                 let user = new User({
//                     firstName: req.body.first_name,
//                     lastName: req.body.last_name,
//                     email: req.body.email,
//                     password: req.body.password,
//                 })
//                 user.save()
//                 .then(user => {
//                     let user_email = user.email
//                     let user_id = user._id
//                     let token = jwt.sign({user_id, user_email}, secret_key, {expiresIn: 60})

//                     res.cookie('id', user_id, { maxAge: alive_time })
//                     res.cookie('email', user_email, { maxAge: alive_time })
//                     res.cookie('token', token, { maxAge: alive_time })
//                     res.redirect('http://3.131.49.106/home')
//                     // res.render("home.html", {
//                     //     username:"Hi, " + req.body.last_name,
//                     //     message: "Welcome To EPortfolio, start to edit your home page."
//                     // })
//                 })
//                 .catch(error => {
//                     console.log(error)
//                     res.render("home.html", {
//                         message:"Login error, try again :)"
//                     })
//                 })
//             }
//         })
//     }
//     else {
//         res.render("index.html", {
//             login_error_message: "",
//             register_error_message: "Please enter all information."
//         })
//     }
// })

app.listen(3001,function(){
    console.log("port: 3001, running....");
})