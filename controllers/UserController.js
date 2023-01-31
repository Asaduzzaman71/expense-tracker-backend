const User = require('../models/User');
const {saveUser,signIn} = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const bcrypt = require('bcrypt');
const {  validationResult } = require('express-validator');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
    const result = await saveUser(req)
    if(result.status == 400){
        throw new CustomError.BadRequestError(result.message);
    }
    const tokenUser = createTokenUser(result.data);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: result.data });
};
// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       throw new CustomError.BadRequestError('Please provide email and password');
//     }
//     const user = await User.findOne({ where: { email: email } });
//     if (!user) {
//       throw new CustomError.UnauthenticatedError('Invalid Credentials');
//     }
//     const isPasswordCorrect = await user.comparePassword(password);
//     if (!isPasswordCorrect) {
//         throw new CustomError.UnauthenticatedError('Invalid Credentials');
//     }
//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.OK).json({ user: tokenUser });
// };
const login = async (req, res) => {
    const result = await signIn( req )
    if ( result.status == 400 ){
        throw new CustomError.BadRequestError( result.message );
    } else if (result.status == 401 ){
        throw new CustomError.UnauthenticatedError( result.message );
    }else{
        const tokenUser = createTokenUser( result.data );
        attachCookiesToResponse({ res, user: tokenUser });
        res.status(StatusCodes.OK).json({ user: tokenUser });
    }
};
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
    register,
    login,
    logout,
};
