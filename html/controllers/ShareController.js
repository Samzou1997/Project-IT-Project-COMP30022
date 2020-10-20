const UserData = require('../models/UserData');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var webPageData = require('../views/data_padding/web_page_data.json')
const config = require('../config/web_config.json')
const FileSystemController    = require('../controllers/FileSystemController')
const path                    = require('path');

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
            User.findOne({ email: shareaccount}, function (err, doc1) {
                if (err) {
                    console.log("email error");
                    res.render('SendEmailComfirmation.html', {
                        message: `Link error`
                    });
                }
                else{
                    var userID_str = doc1._id.toHexString();
                    var userCustomizeFileDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.userCustomizeFileDir);
                    var documentDir = path.join(config.fileSystem.userDataDir, userID_str, config.fileSystem.dashboard_document);
                    var fileList = FileSystemController.getFileUrls(userCustomizeFileDir);
                    webPageData.sharepage.firstname = doc1.firstName;
                    webPageData.sharepage.lastname = doc1.lastName;
                    webPageData.sharepage.dateofbirth = doc1.details.dateBirth;
                    webPageData.sharepage.gender = doc1.details.gender;
                    webPageData.sharepage.email = doc1.email;
                    webPageData.sharepage.phone = doc1.details.phone;
                    webPageData.sharepage.content = documentDir;
                    webPageData.sharepage.educationlist = doc1.education;
                    webPageData.sharepage.employmentlist = doc1.employment;
                    webPageData.sharepage.volunteerlist = doc1.volunteer;
                    webPageData.sharepage.filelist = fileList;

                    var dataCleanStr = JSON.stringify(webPageData.sharepage);
                    var dataCleanObj = JSON.parse(dataCleanStr);
                    res.render('share.html', dataCleanObj);
                }
            })
        }
    })
}

module.exports = {
    SharePage
}