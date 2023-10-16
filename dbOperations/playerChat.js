import ChatSchema from "../models/ChatSchema.js"
import messageSchema from "../models/messageSchema.js"

export const createUserChat = async (chatName, friend, user) => {
    try {
        const newChat = await new ChatSchema({
            chatName: chatName,
            users: [friend, user],
            groupAdmin: user
        }).save()
        const chat = await ChatSchema.findOne({ _id: newChat._id })
            .populate("users", "email name _id")
        return chat
    } catch (error) {
        console.error('Error finding chats:', error);
        throw error;
    }
}

export const findChatsForUser = async (userId) => {
    try {
        const chats = await ChatSchema.find({ users: { $in: userId } }).sort({ updatedAt: -1 })
            .populate("users", "email name _id")
            .populate("users lastMessage")
        return chats;
    } catch (error) {
        console.error('Error finding chats:', error);
        throw error;
    }
};

export const sendMessage = async (chatId, user, message) => {
    try {
        const newMessage = await new messageSchema({
            message: message,
            sender: user,
            chatId: chatId
        }).save()
        await ChatSchema.findOneAndUpdate({
            _id: chatId
        }, { $set: { lastMessage: newMessage._id } })
        const result = await messageSchema.findOne({ _id: newMessage._id })
            .populate("sender", "email name _id")
            .populate("chatId", "chatsName groupAdmin delete ")
        return result   
    } catch (error) {
        console.error('Error finding chats:', error);
        throw error;
    }
}
export const findAllMessages = async (chatId) => {
    try {
        const messages = await messageSchema.find({ chatId: chatId }, { message: 1, sender: 1, updatedAt: 1 })
            .populate("sender", "email name _id")
            .populate("chatId", "chatsName groupAdmin delete ")
        return messages
    } catch (error) {
        console.error('Error finding chats:');
        throw error;
    }
}