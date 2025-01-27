// Author
// Content
// Media
// AudioURL
// Document
// GiphyURL
// Date
// Type => Media || Text || Audio || Document || Giphy

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    url: { type: String },
    name: { type: String },
    size: { type: Number },
})

const messageSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        trim: true,
    },
    media: [
        {
            type: {
                type: String,
                enum: ['image', 'video'],
            },
            url: {
                type: String,
            }
        }
    ],
    audioUrl: {
        type: String,
    },
    giphyUrl: {
        type: String,
    },
    messageType: {
        type: String,
        enum: ['Media', 'Audio', 'Gophy', 'Document', 'Text'],
    },
    document: documentSchema,
});

const messageModel = new mongoose.model("Message", messageSchema);

module.exports = messageModel;