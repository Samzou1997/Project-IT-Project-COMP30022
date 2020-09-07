var express       = require("express");
var bodyParser    = require('body-parser');
var querystring   = require('querystring');
var mongoose      = require('mongoose');
var morgan        = require('morgan');
const jwt         = require('jsonwebtoken')
var cookieParser  = require('cookie-parser');
var tokenVerifier = require('./controllers/TokenVerifier')
//const UserRoute     = require('./routes/user')
const User        = require('./models/User')
const MainRouter  = require('./routes/main')

mongoose.connect('mongodb://testacc:qpzm123456@localhost:27017/GeekDB?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database Connection Established!')
})

var app = express();

//app.use('/Login', UserRoute)
app.engine("html", require("express-art-template"));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser())



/* 接受请求并反馈数据渲染到界面*/
// app.post("/home", function (req, res) { })

app.get("/home", function (req, res) {
  app.use('/home', require('./routes/main'))
  // let secret_key = "secret"
  // let alive_time = 60 * 60 * 24

  // // if there are cookies included in the request
  // if (req.cookies["email"] != null) {
  //   let req_token = req.cookies['token']
  //   let req_user_id = req.cookies['id']
  //   let req_user_email = req.cookies['email']

  //   //verify token
  //   jwt.verify(req_token, secret_key, function (error, decoded) {
  //     if (error) {
  //       console.log("token decode error")
  //       res.cookie('id', '', { maxAge: 0 })
  //       res.cookie('email', '', { maxAge: 0 })
  //       res.cookie('token', '', { maxAge: 0 })
  //       res.render('index.html', {
  //         login_error_message: "Login expired.",
  //         register_error_message: ""
  //       })
  //     }
  //     else {
  //       User.findOne({ email: decoded.user_email }, function (err, doc) {
  //         if (err) {
  //           console.log("db error")
  //         }
  //         res.render('home.html', {
  //           username: "Hi, " + doc.lastName,
  //           message: "Welcome to E-portfolio."
  //         })
  //       })
  //     }
  //   })
  // }
  // else {
  //   res.render('index.html', {
  //     login_error_message: "Please login first.",
  //     register_error_message: ""
  //   })
  // }
})

// app.get("/logout", function(req,res){
//   res.cookie('id', '', { maxAge: 0 })
//   res.cookie('email', '', { maxAge: 0 })
//   res.cookie('token', '', { maxAge: 0 })
//   res.redirect('http://3.131.49.106/')
// })

app.listen(3000, function () {
  console.log("port: 3000, running....");
})