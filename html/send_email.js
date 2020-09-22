//import nodemailer for setup smtp and send email
var nodemailer = require("nodemailer");

//the smtp service address and acount use for sending link
var smtp = "smtp.gmail.com"
var mailFrom = "team5eportifolio@gmail.com"
var mailPwd = "tcptoteviestzgkn"

function emailTo(email,subject,text,html) {
    //create sender
    var transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
            user: mailFrom,
            pass: mailPwd 

        }
    });
    //parameter for sending email
    var mailOptions = {
        from: mailFrom,
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
                console.log("send fail");
                return;
            }
            console.log("send sucess");
        });
    }catch (err) {
        console.log("send fail");
    }
}

var email = "yuxuekuangmo@gmail.com";
var subject = "test";
var text =undefined;
var html = "<p>test</p><p>To reset password</p><p>click the link below：</p><p><a href='https://cn.pornhub.com/front/lost_password'>reset your password</a></p>";;
emailTo(email, subject, text, html);