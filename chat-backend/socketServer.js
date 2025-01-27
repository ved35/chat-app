const authSocket = require('./middleware/authSocket');
const dissconnectHandler = require('./socketHandlers/disconnectHandler');
const chatHistoryHandler = require('./socketHandlers/getMessageHistoryHandler');
const newConnectionHandler = require('./socketHandlers/newConversationHandler');
const newMessageHandler = require('./socketHandlers/newMessageHandler');
const startTypingHandler = require('./socketHandlers/startTypingHandler');
const stopTypingHandler = require('./socketHandlers/stopTypingHandler');

const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            method: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    io.on("connection", (socket) => {
        console.log("user connected");
        console.log("socket-id:", socket.id);

        // newConnectionHandler
        socket.on("new-connection", (data) => {
            newConnectionHandler(socket, io);
        })

        // disconnectHandler
        socket.on("disconnect", () => {
            dissconnectHandler(socket);
        });

        // new message handler
        socket.on("new-message", (data) => {
            newMessageHandler(socket, data, io);
        });

        // chat history handler
        socket.on("direact-chat-history", (data) => {
            chatHistoryHandler(socket, data);
        });

        // start typing handler
        socket.on("start-typing", (data) => {
            startTypingHandler(socket, data, io);
        });

        // stop typing handler
        socket.on("stop-typing", (data) => {
            stopTypingHandler(socket, data, io);
        });
 
    });
};

module.exports = { registerSocketServer }