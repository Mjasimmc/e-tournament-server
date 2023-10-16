
import adminSchema from "../models/adminSchema.js";
import playerSchema from "../models/playerSchema.js";
import gamemasterSchema from "../models/gamemasterSchema.js";


export const getAdminWithEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await adminSchema.findOne({ email })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

export const blockPlayerUsage = async (playerId) => {
    try {
        const player = await playerSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { block: true }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const unblockPlayerUsage = async (playerId) => {
    try {
        const player = await playerSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { block: false }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const deletePlayerUsage = async (playerId) => {
    try {
        const player = await playerSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { delete: true }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const revivePlayerUsage = async (playerId) => {
    try {
        const player = await playerSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { delete: false }
        })
        return player
    } catch (error) {
        throw error
    }
}

// gamemasters


export const blockGamemasterUsage = async (playerId) => {
    try {
        const player = await gamemasterSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { block: true }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const unblockGamemasterUsage = async (playerId) => {
    try {
        const player = await gamemasterSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { block: false }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const deleteGamemasterUsage = async (playerId) => {
    try {
        const player = await gamemasterSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { delete: true }
        })
        return player
    } catch (error) {
        throw error
    }
}
export const reviveGamemasterUsage = async (playerId) => {
    try {
        const player = await gamemasterSchema.findOneAndUpdate({ _id: playerId }, {
            $set: { delete: false }
        })
        return player
    } catch (error) {
        throw error
    }
}