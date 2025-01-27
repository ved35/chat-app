const catchAsync = require("../utilities/catchAsync");
const UserModel = require("../models/user.model");
const ConversationModel = require("../models/conversation.model");

// Get Me
exports.getMe = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        status: "success",
        message: 'user info found successfully',
        data: {
            user
        },
    })
})

// Update Me
exports.updateMe = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { name, jobTitle, bio, country } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        {
            name,
            jobTitle,
            bio,
            country
        },
        {
            new: true,
            validateModifiedOnly: true
        });

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
            user: updatedUser,
        }
    });
})

// Update Avatar
exports.updateAvatar = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { avatar } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
        _id,
        {
            avatar,
        },
        {
            new: true,
            validateModifiedOnly: true
        });

    res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
        data: {
            user: updatedUser,
        }
    });
});

// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(_id).select("+password");

    if (!(await user.correctPassword(currentPassword, user.password))) {
        return res.status(400).json({
            status: 'error',
            message: 'Current password is incorrect'
        });
    }

    user.password = newPassword;
    user.passwordChangeAt = Date.now();

    await user.save({});

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully',
    });
});

// Get User
exports.getUser = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    const other_verfied_user = await UserModel.find({ _id: { $ne: _id }, verified: true }).select("name avatar _id status");

    res.status(200).json({
        status: 'success',
        message: 'Users found successfully',
        data: {
            users: other_verfied_user,
        }
    });
});

// Start Conversation
exports.startConversation = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const { receiverId } = req.body;

    // Check if conversation already exists
    let conversation = await ConversationModel.findOne({
        participants: { $all: [_id, receiverId] }
    }).populate('messages').populate('participants');

    if(conversation){
        res.status(200).json({
            status: 'success',
            message: 'Conversation found successfully',
            data: {
                conversation,
            }
        });
    } else {
        // Create new conversation
        let newConversation = await ConversationModel.create({
            participants: [_id, receiverId],
        });

        newConversation = await ConversationModel.findById(newConversation._id).populate('message').populate('participants');

        res.status(201).json({
            status: 'success',
            message: 'Conversation created successfully',
            data: {
                conversation: newConversation,
            }
        })
    }
});

// Get Conversation
exports.getConversations = catchAsync(async (req, res, next) => {
    const { _id } = req.user;

    // Find all conversation where the current user is logged in user is a participant

    const conversations = await ConversationModel.find({
        participants: {$in: [_id]},
    }).populate('messages').populate('participants');

    res.status(200).json({
        status: 'success',
        message: 'Conversations found successfully',
        data: {
            conversations,
        }
    });
});