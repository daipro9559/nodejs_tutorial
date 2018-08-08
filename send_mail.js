var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'daipro9559@gmail.com',
        pass: 'dainguyen95'
    }
});

var mailOption = {
    from: 'daipro9559@gmail.com',
    to: 'dainguyen300695@gmail.com',
    subject: 'nodejs tutorial',
    text: 'nodejs send mail'
};

transporter.sendMail(mailOption, function(err, infor) {
    console.log(infor);
});