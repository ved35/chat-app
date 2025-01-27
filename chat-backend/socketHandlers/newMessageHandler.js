const { on } = require("nodemailer/lib/xoauth2");
const ConversationModel = require("../models/conversation.model");
const messageModel = require("../models/message.model");

const newMessageHandler = async (socket, data, io) => {
    console.log('new message Data:', data);

    const { conversationId, message } = data;
    const { author, content, media, audioUrl, document, type, giphyUrl } = message;

    try {
        // finf the conversation by conversationId
        const conversation = await ConversationModel.findById(conversationId);

        if(!conversation){
            // If conversation not found, emit an error event to the client
            return socket.emit("error", { message: "Conversation not found" });
        }

        // create the message object
        const newMessage = messageModel.create({
            author,
            content,
            media,
            audioUrl,
            document,
            type,
            giphyUrl,
        });

        // push the message to the conversation
        conversation.messages.push(newMessage._id);

        // populate the conversation with the message and participant
        const updatedConversation = await conversation.populate('messages').populate('participants').execPopulate();

        // find the participants who are online(status === 'Online') and have socketId
        const onlineParticipants = updatedConversation.participants.filter(participant => participant.status === 'Online' && participant.socketId);

        // emit the message to all online participants
        onlineParticipants.forEach(participant => {
            io.to(participant.socketId).emit('new-direct-message', {
                conversationId,
                message: newMessage,
            });
        });

    } catch (error) {
        console.log('newMessageHandler', error);
        socket.emit("error", { message: "Fail to send message" });
    }

};

module.exports = newMessageHandler;