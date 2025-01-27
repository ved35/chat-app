const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const catchAsync = require("../utilities/catchAsync");

 const protect = catchAsync(async (req, res, next) => {
    try {

        //token 
        let token;
        if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
            token = req.header.authorization.split(" ")[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt
        }

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: "You are not logged in! please login to access application"
            });
        }

        //verify token

        const decoded = await promisify(jwt.verify(token, process.env.TOKEN_KEY));
        console.log("docoded->", decoded);

        const this_user = await UserModel.findById(decoded.userId);

        //check if user is exist

        if (!this_user) {
            return res.status(401).json({
                status: 'error',
                message: "The user belonging to this token does no longer exists"
            });
        }

        //check user change password after the token was issued

        if (this_user.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                status: 'error',
                message: "User recently change password! please log in again."
            });
        }

        req.user = this_user
        next()

    } catch (error) {
        console.log("Protect->", error);
        return res.status(400).json({
            status: 'error',
            message: "Authentication failed"
        });
    }
});

module.exports = protect;