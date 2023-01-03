const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const bcrypt = require('bcrypt');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const isEmailExist = async(req) => await User.findOne({ where: { email: email } });
const register = async (req, res) => {
    const profile_pic = req.file.filename
    console.log(profile_pic)
    const { firstName: first_name, lastName: last_name, email, password, role, email_verification_token, is_email_verified } = req.body;
    const emailAlreadyExists = 
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ first_name, last_name, email, password, role, profile_pic, email_verification_token, is_email_verified });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
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
