var sender =  require('./send_email')
var email = "yuxuekuangmo@gmail.com";
var subject = "test";
var text =undefined;
var html = "<p>test</p><p>To reset password</p><p>click the link below：</p><p><a href='https://cn.pornhub.com/front/lost_password'>reset your password</a></p>";;
sender.emailTo(email, subject, text, html)