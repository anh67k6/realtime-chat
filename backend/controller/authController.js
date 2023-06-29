const User = require("../models/userModel");
const AppError = require('../ultis/AppError.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signAccessToken = (id) => {
     return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
     });
 };
 
 const signRefreshToken = (id) => {
     return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
     });
 };

const createAndSendToken = (user, statusCode, req, res) => {
     const accessToken = signAccessToken(user._id);
 
     const cookieOptions = {
         expires: new Date(
             Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 50 * 1000
         ),
         secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
         httpOnly: true,
     };
     res.cookie('jwt', accessToken, cookieOptions);
     
     res.status(statusCode).json({
         success: true,
         status: 'success',
         token: accessToken,
         data: {
             user,
         },
     });
 };


exports.signup = (async(req, res, next)=>{
     const existedEmail = await User.findOne({ email: req.body.email });

     if(existedEmail) return next(new AppError("Email already exists", 409));

     const newUser = await User.create({
          name : req.body.name,
          email : req.body.email,
          password : req.body.password,
          passwordConfirm : req.body.passwordConfirm,
     })

     createAndSendToken(newUser, 201, req, res);
})

exports.login = (async (req, res, next) => {
     const { email, password } = req.body;

     if (!email || !password)
         return next(new AppError('PLease provide email and password', 400));

     const user = await User.findOne({ email: email }).select('+password');

     console.log(user);
     
     // if (!user || !(await user.correctPassword(password, user.password)))
     //     return next(new AppError('Incorrect email or password', 401));

     createAndSendToken(user, 200, req, res);
 });