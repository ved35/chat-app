// Participant
//Messages

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
});


const ConversationModel = new mongoose.model("Conversation", conversationSchema);

module.exports = ConversationModel;