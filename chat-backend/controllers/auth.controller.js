const UserModel = require("../models/user.model");
const catchAsync = require("../utilities/catchAsync");
const otpGenerator = require('otp-generator');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Mailer = require("../servies/mailer");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//sign JWT token

const signToken = (userId) => {
    console.log("userId->", userId);
    console.log("TOKEN_KEY->", process.env.TOKEN_KEY);

    let token = jwt.sign({ userId: userId.toString() } , process.env.TOKEN_KEY)
    console.log("token->", token);
    return token
}

// Register new user
exports.Register = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existing_user = await UserModel.findOne({
        email: email,
    });

    let new_user;

    if (existing_user && existing_user.verified === true) {
        // email already in use
        return res.status(400).json({
            status: 'error',
            message: 'Email already in use',
        });
    } else if (existing_user && existing_user.verified === false) {
        //rewrite doc & create new user
        await UserModel.findOneAndDelete({ email: email })
    }
    // there is no previous record => create new user
    new_user = await UserModel.create({
        name,
        email,
        password
    })


    req.userId = new_user._id;

    next();
});

// Sent OTP
exports.sentOTP = catchAsync(async (req, res, next) => {
    const { userId } = req;

    // genrate new OTP
    const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    })

    const otp_expiry_time = Date.now() * 10 * 60 * 1000;
    console.log("🚀 ~ exports.sentOTP=catchAsync ~ otp_exp̥iry_time:", otp_expiry_time, typeof otp_expiry_time)

    const user = await UserModel.findByIdAndUpdate(userId, {
        otp: new_otp.toString(),
        otp_expiry_time: otp_expiry_time,
    }, {
        new: true,
        validateModifiedOnly: true,
    });

    user.otp = new_otp;
    await user.save({})

    // sent OTP via mail
    try {
        Mailer({
            name: user.name,
            otp: new_otp,
            email: user.email
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Somthing went wrong"
        })
    }

    res.status(200).json({
        status: "success",
        message: "OTP sent Successfully!"
    });

});

exports.resendOTP = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    console.log("email->", email);
    

    const user = await UserModel.findOne({
        email: email,
    });

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: "Email is Invalid",
        });
    }

    const new_otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
    })
    console.log("🚀 ~ exports.resendOTP=catchAsync ~ new_o̥tp:", new_otp)

    const otp_expiry_time = Date.now() * 10 * 60 * 1000;

    user.otp = new_otp;
    user.otp_expiry_time = otp_expiry_time;

    await user.save({});

    // sent OTP via mail
    Mailer({
        name: user.name,
        otp: new_otp,
        email: user.email
    });

    res.status(200).json({
        status: "success",
        message: "OTP sent Successfully!"
    });
});

// Verify OTP
exports.verfiyOTP = catchAsync(async (req, res, next) => {
    const { email, otp } = req.body;

    const user = await UserModel.findOne({
        email,
        otp_expiry_time: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({
            status: 'error',
            message: 'Email is invalid or OTP expired'
        })
    }

    if (user.verified) {
        return res.status(400).json({
            status: 'error',
            message: 'Email is already verified'
        })
    }

    if (!(await user.correctOTP(otp, user.otp))) {
        return res.status(400).json({
            status: 'error',
            message: 'Otp is incorrect',
        });
    }

    //otp is correct
    user.verified = true;
    user.otp = undefined;

    await user.save({
        new: true,
        validateModifiedOnly: true
    });

    console.log("user->", user);
    

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        message: "Email verfied successfully!",
        token,
        user_id: user._id
    })
})

// Login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Both email and password is required'
        });
    }

    const user = await UserModel.findOne({
        email: email
    }).select("+password");

    if (!user || !user.password) {
        return res.status(400).json({
            status: 'error',
            message: 'No record found for this email',
        })
    }

    let campare = await user.correctPassword(password, user.password);
    console.log("🚀 ~ exports.login=catchAsync ~ campare",password, user.password,  campare)

    if (!(await user.correctPassword(password, user.password))) {
        return res.status(400).json({
            status: 'error',
            message: 'Email or Password is incorrect'
        });
    }

    const token = signToken(user._id);

    res.status(200).json({
        status: 'success',
        message: "Logged in successfully!",
        token,
        userId: user._id,
    });
});


