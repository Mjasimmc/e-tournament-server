import mongoose from "mongoose";
const chatSchema = mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'player'
        }
    ],
    isgroupChat: {
        type: Boolean,
        default: false
    },
    lastMessage: {
        type: mongoose.Schema.ObjectId,
        ref:'message'
    },
    groupAdmin: {
        type: mongoose.Schema.ObjectId,
        ref: 'player'
    },
    delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model('chat',chatSchema)