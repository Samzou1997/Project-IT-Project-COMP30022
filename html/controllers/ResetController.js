//import nodemailer for setup smtp and send email
const nodemailer = require("nodemailer");
const mailsender = require('../config/web_config.json');
const UserData = require('../models/UserData');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//the smtp service address and acount use for sending link
const smtp = mailsender.email_info.smtp;
const mailKey = mailsender.email_info.mailKey;
const mailForm = mailsender.email_info.mailFrom;
const secret_key = mailsender.token_setting.secret_key
const token_expire_time = mailsender.token_setting.expire_time

const resetpage = (req, res, next) => {
    res.render("Reset_pd.html");
}

const emailTo = (req, res, next) => {
    UserData.findOne({ email: req.body.email }, function (err, doc) {
        if (err) {
          console.log("db error")
        }
        if (doc) {
            var email  = req.body.email;
            let userid = doc._id
            let token = jwt.sign({email}, secret_key, { expiresIn: token_expire_time });
            let updatedData = {
                email: doc.email,
                shareLabel: doc.shareLabel,
                passwordRestToken: token
            }
            UserData.findByIdAndUpdate(userid, {$set: updatedData})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            var subject = "Reset your password for your account"
            var text = undefined;
            var html = `<p>To reset password</p><p>click the link below：</p><p><a href='http://54.206.15.44/Forgot/Resetting/${token}'>reset your password</a></p><p>The link will exprie in one hour!</p>`;
            var transporter = nodemailer.createTransport({
                host: smtp,
                auth: {
                    user: mailForm,
                    pass: mailKey, 
                }
            });
            //parameter for sending email
            var mailOptions = {
                from: mailForm,
                to: email,
                subject: subject,
            };
        
            // read text contant 
            if(text != undefined)
            {
                mailOptions.text =text;
            }
            if(html != undefined)
            {
                mailOptions.html =html;
            }
        
            //start sending
            try {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        res.render('SendEmailComfirmation.html', {
                            message: `send fail to ${email}`
                        });
                        console.log("send fail to %s",email);
                        return;
                    }
                    res.render('SendEmailComfirmation.html', {
                        message: `send sucess to ${email}`
                    });
                    console.log("send sucess to %s", email);
                });
            }catch (err) {
                res.render('SendEmailComfirmation.html', {
                    message: `send fail to ${email}`
                });
                console.log("send fail to %s", email);
            }

        }
        else {
            res.render('SendEmailComfirmation.html', {
                message: `Acount ${email} not found`
            });
            console.log("Acount %s Not found", email);
        }
    })
}

const Resetpd = (req, res, next) => {
    jwt.verify(req.params.token, secret_key, function (error, decoded) {
        if (error) {
            console.log("token decode error");
            res.render('SendEmailComfirmation.html', {
                message: `Link expire`
            });
        }
        else {
            const newLocal = decoded.email;
            UserData.findOne({ email: newLocal}, function (err, doc) {
            if (err) {
                console.log("email error");
                res.render('SendEmailComfirmation.html', {
                    message: `Link error`
                });
            }
            else {
                if(doc.passwordRestToken ==  req.params.token){
                    res.render("Resetting_pd.html",{
                        token: req.params.token
                    })
                }
                else{
                    console.log("token error");
                    console.log(doc.passwordRestToken);
                    console.log(req.params.token);
                }
            }
          })
        }
      })
}

const ResettingPD = (req, res, next) => {
    jwt.verify(req.body.token, secret_key, function (error, decoded) {
        if (error) {
            console.log("token decode error");
            res.render('SendEmailComfirmation.html', {
                message: `Link expire`
            });
        }
        else {
            UserData.findOne({ email: decoded.email}, function (err, doc) {
            if (err) {
                console.log("email error");
                res.render('SendEmailComfirmation.html', {
                    message: `Link error`
                });
            }
            else {
                if(doc.passwordRestToken ==  req.body.token){
                    User.findOne({ email: decoded.email}, function (err, doc){
                        let userid = doc._id;
                        let updatedData = {
                            password: req.body.password
                        }
                        User.findByIdAndUpdate(userid, {$set: updatedData})
                        .then(response => {
                            res.render('SendEmailComfirmation.html', {
                                message: `password changed`
                            });
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    })
                } 
                else{
                    console.log("token error");
                    console.log(doc.passwordRestToken);
                    console.log(req.params.token);
                }
            }
          })
        }
      })
}



module.exports = {
    emailTo,resetpage,Resetpd,ResettingPD
}
