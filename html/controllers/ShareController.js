const UserData = require('../models/UserData');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var webPageData = require('../views/data_padding/web_page_data.json')
const config = require('../config/web_config.json')

const SharePage = (req, res, next) => {
    var email_md5 = req.params.email_md5
    console.log("pass2")
    console.log(email_md5)
    UserData.findOne({ shareLabel: email_md5}, function (err, doc) {
        if (err) {
            console.log("email error");
            res.render('SendEmailComfirmation.html', {
                message: `Link error`
            });
        }
        else {
            var shareaccount = doc.email
            console.log(shareaccount)
            User.findOne({ email: shareaccount}, function (err, doc) {
                if (err) {
                    console.log("email error");
                    res.render('SendEmailComfirmation.html', {
                        message: `Link error`
                    });
                }
                else{
                    var userID_str = doc._id.toHexString();
                    var userCustomizeFileDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.userCustomizeFileDir);
                    var documentDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);
                    var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);
                    webPageData.sharepage.content = documentDir
                    webPageData.sharepage.educationlist = doc.education
                    webPageData.sharepage.employmentlist = doc.employment
                    webPageData.sharepage.volunteerlist = doc.volunteer
                    webPageData.sharepage.filelist = fileList;
                    res.render('share.html', webPageData.files);
                }
            })
        }
    })
}

module.exports = {
    SharePage
}