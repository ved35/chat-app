const UserModel = require("../models/user.model");

const newConnectionHandler = async (socket, io) => {
    const { userId } = socket.user;

    console.log('User os connected', userId);

    //Add SocketId to User record and set status to online

    const user = await UserModel.findByIdAndUpdate(userId, {
        socketId: socket.id,
        status: "Online",
    }, { 
        new: true,
        validateModifiedOnly: true,
    });

    if(user){
        //broadcast to all users that this user is online
        socket.broadcast.emit('user-connected', {
            message: `User ${user.name} has connected`,
            userId: user._id,
            status: 'Online',
        });
    } else {
        console.log('User with id',userId, 'not found');
    }
};

module.exports = newConnectionHandler;