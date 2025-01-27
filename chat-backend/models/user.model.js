const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    jobTitle: {
        type: String,
    },
    bio: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Name is required"],
        validate: {
            validator: function (email) {
                return validator.isEmail(email);
            },
            message: (props) => `Email (${props.value}) is invalid!`,
        },
        unique: true
    },
    password: {
        type: String,
    },
    passwordChangeAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otp_expiry_time: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["Online", "Offline"],
        default: "Offline",
    },
    socketId: {
        type: String,
    }
}, {
    timestamps: true,
});

//pre save Hooks 
userSchema.pre("save", async function (next) {
    // only run this function if otp is modified
    if (this.isModified('otp')) {
        if(this.otp){
            this.otp = await bcrypt.hash(this.otp.toString(), 12);
    
            console.log("otp->", this.otp.toString());
        }
    }

    if (this.isModified('password')) {
        if(this.password){
            this.password = await bcrypt.hash(this.password.toString(), 12);
    
            console.log("password->", this.password.toString());
        }
    }

    next();
});

//Method
userSchema.methods.correctOTP = async function (candidateOTP, userOTP) {
    return await bcrypt.compare(candidateOTP, userOTP);
};

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)

        return JWTTimeStamp < changeTimeStamp
    }
    return false;
}

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;