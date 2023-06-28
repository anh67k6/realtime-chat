const User = require("../models/messageModel");

exports.signup = (async(req, res, next)=>{
     const existedEmail = await User.fineOne({ email: req.body.email });

     if(existedEmail) return next(new AppError("Email already exists", 409));

     const newUser = await User.create({
          name : req.body.name,
          email : req.body.email,
          password : req.body.password,
          passwordConfirm : req.body.passwordConfirm,

     })
})

exports.login = (async(req, res, next)=> {
     const { email, password } = req.body;

     if(!email || !password) return next(new AppError("Please enter your email and password", 404));

     const user = await User.findOne({ email: email, password: password});

     if(!user || !(await user.correctPassword(password, user.password)))
          return next(new AppError("Incorrect email or password", 404));
})