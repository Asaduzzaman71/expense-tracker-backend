var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rabbimahmud95@gmail.com',
        pass: 'tvxnjgzowzahkgik'
    }
});
module.exports = { transporter }