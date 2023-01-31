const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const bcrypt = require('bcrypt');
const { transporter } = require('../config/email');
const { createOrUpdateUser , getUserByEmail } = require('../repositories/userRepository');

// const saveUser = async (req) => {
//     //check email existance
//     const emailAlreadyExist = await getUserByEmail(req);
//     if(emailAlreadyExist){
//         return { status:400, message:"Email already exists" }
//     }
//     //hashed password before save into db
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     req.body.profile_pic = req.file.filename
//     const user = createOrUpdateUser(req);
//     return { status: 200, message: 'User saved successfully', data: user }
// };

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const randomNumber = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}
const saveUser = async (req) => {
    //check email existance
    const emailAlreadyExist = await getUserByEmail(req);
    if (emailAlreadyExist) {
        return { status: 400, message: "Email already exists" }
    }
    //hashed password before save into db
    req.body.password = await bcrypt.hash(req.body.password, 10);

    const token = randomNumber(100000, 999999);

    // req.body.profile_pic = req.file.filename
    const user = await createOrUpdateUser(req, token)
   
    // var mailOptions = {
    //     from: 'rabbimahmud95@gmail.com',
    //     to: 'rabbyasaduzzaman@gmail.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    return { status: 201, message: 'User saved successfully', data: user }
};

module.exports = { saveUser}
