import { blockPlayerUsage, deletePlayerUsage, revivePlayerUsage, unblockPlayerUsage } from "../../dbOperations/admin.js";
import { createNewPlayer } from "../../dbOperations/playerOprerations.js"



export const createPlayer = async (req, res) => {
    try {

        const { name, email, phone, password } = req.body
        if (!name || !email || !phone || !password) {
            return res.status(401).json({ message: "Please enter all fields" })
        }
        const newPlayer = await createNewPlayer(name, email, phone, password);
        res.status(200).send(newPlayer)
    } catch (error) {
        res.status(500).json('internal server')
    }
}

export const blockPlayer = async (req,res)=>{
    try {
        const {playerId} = req.body
        console.log(playerId)
        const block = await blockPlayerUsage(playerId)
        res.status(200).send(block)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const unBblockPlayer = async (req,res)=>{
    try {
        const {playerId} = req.body
        const unblock = await unblockPlayerUsage(playerId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const deletePlayer = async (req,res)=>{
    try {
        const {playerId} = req.body
        const unblock = await deletePlayerUsage(playerId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const revivePlayer = async (req,res)=>{
    try {
        const {playerId} = req.body
        const unblock = await revivePlayerUsage(playerId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}