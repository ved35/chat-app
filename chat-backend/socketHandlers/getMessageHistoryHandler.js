const ConversationModel = require("../models/conversation.model");

const chatHistoryHandler = async (socket, data) => {
    try {
        const { conversationId } = data;

        // Fetch the conversation by conversationId
        const conversation = await ConversationModel.findById(conversationId).select('messages').populate('messages');

        if (!conversation) {
            // If conversation not found, emit an error event to the client
            socket.emit("error", { message: "Conversation not found" });
            return;
        }

        const res_data = {
            conversationId,
            history: conversation.messages
        }

        // Emit the chat history to the client
        socket.emit("chat-history", res_data);

    } catch (error) {
        // handle any error that occurs in the process
        console.log("chatHostoryHandler", error);
        socket.emit("error", { message: "Fail to fetch chat history" });
    }
}

module.exports = chatHistoryHandler;