const User = require('../models/User');
const UserVerify = require('../models/UserVerify');
const createOrUpdateUser = async (req,token) => {
    // const { firstName: first_name, lastName: last_name, email, password, role, profile_pic, email_verification_token, is_email_verified } = req.body;
    // const user = await User.create({ first_name, last_name, email, password, role, profile_pic, email_verification_token, is_email_verified });
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.create({ firstName, lastName, email, password, role });
    const userVerify = await UserVerify.create({ userId: user.id, emailVerificationToken: token, isEmailVerified:false})
    return user = await User.findOne({
        where: { email: req.body.email }, 
        include: [{
            model: UserVerify,
            as: 'userVerify'
        }]
    })
};
const getUserByEmail = async (req) => {   
    const user = await User.findOne({
        where: { email: req.body.email } 
        })
    return user
};
module.exports = { createOrUpdateUser, getUserByEmail }
