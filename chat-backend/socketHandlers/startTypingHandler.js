const UserModel = require("../models/user.model");

const startTypingHandler = async (socket, data, io) => {
    const { userId, conversationId } = data;
    // this userId is the user who is typing

    // fetch the user by userId
    const user = await UserModel.findById(userId);

    if(user && user.socketId && user.status === "Online"){
        // broadcast to all users that this user is typing
        const dataToSend = {
            conversationId,
            typing: true,
        };

        // Emiting start typing event to the user
        io.to(user.socketId).emit('start-typing', dataToSend);
    } else {
        console.log('User with id', userId, 'not found or offline');
    }
};

module.exports = startTypingHandler;