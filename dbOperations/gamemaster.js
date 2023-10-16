import gamemasterSchema from "../models/gamemasterSchema.js"


// find all game masters 
// from admin
export const findAllGamemasters = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const list = await gamemasterSchema.find({}, { name: 1, email: 1,delete:1,block:1 })
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// find a gameMaster with email
export const findGameMasterWithEmail = async (email) => {
    try {
        const user = await gamemasterSchema.findOne({ email })
        return user
    } catch (error) {
        throw (error)
    }

}

// find a gameMaster with id
export const getGamemasterData = async (id) => {
    return new Promise(async (resolve) => {
        try {
            const list = await gamemasterSchema.findOne({ _id: id }, { name: 1, email: 1, profilepic: 1, CreateTournament: 1 })
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}

// Create new Gamemaster
export const createNewGameMaster = async (name, email, phone, password, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await new gamemasterSchema({
                name,
                email,
                phone,
                password,
            }).save()
            resolve(user)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

// Updation require when an updation occurs on tournament created or not  { tournamentid, tournamentupdate,_id }
export const updateCreateTournament = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await gamemasterSchema.findOneAndUpdate({ _id: data._id }, {
                $set: {
                    CreateTournament: data
                }
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

