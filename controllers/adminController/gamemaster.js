import {
    blockGamemasterUsage,
    deleteGamemasterUsage,
    reviveGamemasterUsage,
    unblockGamemasterUsage
} from "../../dbOperations/admin.js";
import { createNewGameMaster } from "../../dbOperations/gamemaster.js";


export const createGamemaster = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body
        if (!name || !email || !phone || !password) {
            return res.status(401).json({ message: "Please enter all fields" })
        }
        const newPlayer = await createNewGameMaster(name, email, phone, password);
        res.status(200).send(newPlayer)
    } catch (error) {
        res.status(500).json('internal server')
    }
}

export const blockGamemaster = async (req, res) => {
    try {
        const { userId } = req.body
        console.log(userId)
        const block = await blockGamemasterUsage(userId)
        res.status(200).send(block)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const unBblockGamemaster = async (req, res) => {
    try {
        const { userId } = req.body
        const unblock = await unblockGamemasterUsage(userId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const deleteGamemaster = async (req, res) => {
    try {
        const { userId } = req.body
        const unblock = await deleteGamemasterUsage(userId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}
export const reviveGamemaster = async (req, res) => {
    try {
        const { userId } = req.body
        const unblock = await reviveGamemasterUsage(userId)
        res.status(200).send(unblock)
    } catch (error) {
        res.status(500).json('internal server')
    }
}