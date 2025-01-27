const UserModel = require("../models/user.model");

const dissconnectHandler = async (socket) => {
    console.log("user disconnected", socket.id);
    // Update the user document set socketId to undefine and status to offline

    const user = await UserModel.findOneAndUpdate({
        socketId: socket.id
    }, {
        socketId: undefined, 
        status: "Offline"
    }, {
        new: true, 
        validateModifiedOnly: true
    });

    if(user){
        //broadcast to all users that this user is offline
        socket.broadcast.emit('user-disconnected', {
            message: `User ${user.name} has disconnected`,
            userId: user._id,
            status: 'Offline'
        });
    } else {
        console.log('User with socketId', socket.id, 'not found');
    }
};

module.exports = dissconnectHandler;