//import nodemailer for setup smtp and send email
var nodemailer = require("nodemailer");

//the smtp service address and acount use for sending link
var smtp = "smtp.gmail.com"
var mailFrom = "team5eportifolio@gmail.com"
var mailPwd = "Abc12345.."

function emailTo(email,subject,text,html,callback) {
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
                print("send fail");
                return;
            }
            print("send sucess");
        });
    }catch (err) {
        print("send fail");
    }
}