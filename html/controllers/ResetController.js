//import nodemailer for setup smtp and send email
const nodemailer = require("nodemailer");
const mailsender = require('../config/web_config.json');
const UserData = require('../models/UserData');
const jwt = require('jsonwebtoken');

//the smtp service address and acount use for sending link
const smtp = mailsender.email_info.smtp;
const mailKey = mailsender.email_info.mailKey;
const mailForm = mailsender.email_info.mailFrom;
const secret_key = mailsender.token_setting.secret_key
const token_expire_time = mailsender.token_setting.expire_time

const resetpage = (req, res, next) => {
    res.render("Reset_pd.html")
}

const Resetpd = (req, res, next) => {
    console.log(req.params.token);
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
            UserData.findByIdAndUpdate(userid, {$set: updatedData});
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

module.exports = {
    emailTo,resetpage,Resetpd
}

/*var email = "yuxuekuangmo@gmail.com";
var subject = "test";
var text =undefined;
var html = "<p>test</p><p>To reset password</p><p>click the link below：</p><p><a href='https://cn.pornhub.com/front/lost_password'>reset your password</a></p>";;
emailTo(email, subject, text, html);*/