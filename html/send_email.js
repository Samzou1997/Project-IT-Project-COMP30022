//import nodemailer for setup smtp and send email
var nodemailer = require("nodemailer");

//the smtp service address and acount use for sending link
//ec2-54-206-15-44.ap-southeast-2.compute.amazonaws.coms
var smtp = "smtp.gmail.com"
var mailFrom = "team5eportifolio@gmail.com"
var mailPwd = "Abc12345.."

function emailTo(email,subject,text,html,callback) {
    var transporter = nodemailer.createTransport({
        host: smtp,
        auth: {
            user: mailFrom,
            pass: mailPwd 

        }
    });
    var mailOptions = {
        from: mailFrom,
        to: email,
        subject: subject,
    };
    if(text != undefined)
    {
        mailOptions.text =text;
    }
    if(html != undefined)
    {
        mailOptions.html =html;
    }

    var result = {
        httpCode: 200,
        message: 'success',
    }
    try {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                result.httpCode = 500;
                result.message = err;
                callback(result);
                return;
            }
            callback(result);
        });
    } catch (err) {
        result.httpCode = 500;
        result.message = err;
        callback(result);
    }

}