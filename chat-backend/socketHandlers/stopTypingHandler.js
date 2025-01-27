const UserModel = require("../models/user.model");

const stopTypingHandler = async (socket, data, io) => {
    const { userId, conversationId } = data;
    // this userId is the user who is typing

    // fetch the user by userId
    const user = await UserModel.findById(userId);

    if(user && user.socketId && user.status === "Online"){
        // broadcast to all users that this user is typing
        const dataToSend = {
            conversationId,
            typing: false,
        };

        // Emiting start typing event to the user
        io.to(user.socketId).emit('stop-typing', dataToSend);
    } else {
        console.log('User with id', userId, 'not found or offline');
    }
};

module.exports = stopTypingHandler;