import { findAllMessages } from "../../dbOperations/playerChat.js"
import { searchPlayerData } from "../../dbOperations/playerOprerations.js"

export const searchPlayersData = async (req, res) => {
    try {
        const search = req.query.search
        const players = await searchPlayerData(search, req.user._id)
        res.status(200).send(players)
    } catch (error) {
        res.status(500).send("internal server error")
    }
}

export const getChats = async(id)=>{
    try {
        return await findAllMessages(id)
    } catch (error) {
        console.log(error)
    }
}