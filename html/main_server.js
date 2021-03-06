var express       = require("express");
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var morgan        = require('morgan');
var fs            = require('fs');
var cookieParser  = require('cookie-parser');
var https         = require('https');
//var ejs           = require('ejs');

const PersonalRouter  = require('./routes/PersonalRouter')
const LoginRouter     = require('./routes/LoginRouter')
const RegisetRouter   = require('./routes/RegisterRouter')
const ResetRouter     = require('./routes/ResetRouter')
const ErrorRouter     = require('./routes/ErrorRouter')
const ShareRounter    = require('./routes/ShareRounter')

var privateKey        = fs.readFileSync('/home/IT_Project/html/certification/private.pem', 'utf8');
var certificate       = fs.readFileSync('/home/IT_Project/html/certification/cert.crt', 'utf8');
var credentials       = {key: privateKey, cert: certificate};

mongoose.connect('mongodb://testacc:qpzm123456@localhost:27017/GeekDB?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database Connection Established!')
})

var app = express();

app.engine("html", require("express-art-template"));
//app.engine('html', ejs.__express);
//app.set('view engine', 'html');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/personal', PersonalRouter)
app.use('/Login', LoginRouter)
app.use('/Register', RegisetRouter)
app.use('/Forgot', ResetRouter)
app.use('/Share', ShareRounter)
app.use('/Error', ErrorRouter)

var httpsServer = https.createServer(credentials, app);
var SSLPORT = 3000;

app.listen(SSLPORT, function () {
  console.log("port: 3000, running....");
})