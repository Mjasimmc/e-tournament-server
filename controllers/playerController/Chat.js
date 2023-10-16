import { createUserChat, findAllMessages, findChatsForUser, sendMessage } from "../../dbOperations/playerChat.js"

export const createChat = async (req, res) => {
    try {
        const { friend } = req.body
        if (!friend) {
            return res.status(401).json({ message: "Friend is required" })
        }
        const result = await createUserChat("userChat", friend, req.user._id)
        res.status(200).send(result)
    } catch (error) {
        res.status(200).send('internal server error')
    }
}

export const getAllChatsOfPlayers = async (req, res) => {
    try {
        const chats = await findChatsForUser(req.user._id)
        res.status(200).send(chats)
    } catch (error) {
        res.status(200).send('internal server error')
    }
}
export const getAllMessages = async (req,res)=>{
    try {
        if(!req.query.chatId) return res.status(404).send('chatId not found')
        const messages = await findAllMessages(req.query.chatId)
        res.status(200).send(messages)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}
export const sendMessageToPlayer = async (req,res)=>{
    try {
        const {chatId,message} = req.body
        const sended = await sendMessage(chatId,req.user._id,message)
        res.status(200).send(sended)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
        
    }
}