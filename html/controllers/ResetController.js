//import nodemailer for setup smtp and send email
const nodemailer = require("nodemailer");
const mailsender = require('../config/web_config.json');

//the smtp service address and acount use for sending link
const smtp = mailsender.email_info.smtp;
const mailKey = mailsender.email_info.mailKey;
const mailForm = mailsender.email_info.mailFrom;

const resetpage = (req, res, next) => {
    res.render("Reset_pd.html")
}

const emailTo = (req, res, next) => {
    //create sender email,subject,text,html
    var email  = req.body.email;
    var subject = "Reset your password for your account"
    var text = undefined;
    var html = "<p>test</p><p>To reset password</p><p>click the link below：</p><p><a href='https://cn.pornhub.com/front/lost_password'>reset your password</a></p>";
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
                console.log("send fail to %s",email);
                return;
            }
            console.log("send sucess to %s", email);
        });
    }catch (err) {
        console.log("send fail to %s", email);
    }
}

module.exports = {
    emailTo,resetpage
}

/*var email = "yuxuekuangmo@gmail.com";
var subject = "test";
var text =undefined;
var html = "<p>test</p><p>To reset password</p><p>click the link below：</p><p><a href='https://cn.pornhub.com/front/lost_password'>reset your password</a></p>";;
emailTo(email, subject, text, html);*/