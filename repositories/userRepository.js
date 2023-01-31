const User = require('../models/User');
const UserVerify = require('../models/UserVerify');
const createOrUpdateUser = async (req,token) => {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.create({ firstName, lastName, email, password, role });
    const userVerify = await UserVerify.create({ userId: user.id, emailVerificationToken: token, isEmailVerified:false})
    return  await User.findOne({
        where: { email: req.body.email }, 
        include: [{
            model: UserVerify,
            as: 'userVerify'
        }]
    })
};
const getUserByEmail = async (req) => {   
    const user = await User.findOne({
            where: { email: req.body.email },
            include: [{
                model: UserVerify,
                as: 'userVerify'
            }]
        })
    return user
};
module.exports = { createOrUpdateUser, getUserByEmail }
