import PlayerSchema from "../models/playerSchema.js"
export const findAllPlayers = async () => {
    return new Promise(async (resolve, reject) => {
        await PlayerSchema.find({}, { name: 1, email: 1,block:1,delete:1 })
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })

    })
}
export const getPlayerData = async (id) => {
    return new Promise(async (resolve, reject) => {
        await PlayerSchema.findOne({ _id: id })
            .populate("team.id")
            .then(data => {
                if (data) {
                    resolve(data)
                } else {
                    reject('Not found')
                }
            }).catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

export const findPlayerWithEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        await PlayerSchema.findOne({ email })
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })


    })
}

export const createNewPlayer = async (name, email, phone, password) => {
    return new Promise(async (resolve, reject) => {
        await new PlayerSchema({
            name,
            email,
            phone,
            password,
        }).save()
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })

    })
}

export const addGamesToPlayers = (game, userId) => {
    return new Promise((resolve, reject) => {
        PlayerSchema.findOneAndUpdate({ _id: userId }, {
            $addToSet: {
                games: game
            }
        })
            .then(async () => {
                const user = await getPlayerData(userId)
                resolve(user)
            }).catch((err) => reject(err))
    })
}
export const removeGamesToPlayers = (game, userId) => {
    return new Promise((resolve, reject) => {
        PlayerSchema.findOneAndUpdate({ _id: userId }, {
            $pull: {
                games: game
            }
        }).then(async () => {
            const user = await getPlayerData(userId)
            resolve(user)
        }).catch((err) => reject(err))
    })
}

export const updatePlayerData = (name, email, userId) => {
    return new Promise(async (resolve, reject) => {
        await PlayerSchema.findOneAndUpdate({ _id: userId }, {
            $set: {
                name: name,
                email: email
            }
        }).then(async () => {
            const user = await getPlayerData(userId)
            resolve(user)
        }).catch((err) => reject(err))
    })
}

export const searchPlayerData = async (data,user) => {
    return new Promise(async (resolve, reject) => {

        let search = { _id:{$ne:user}}
        if(data){
            search.name={ $regex: new RegExp(`^${data}`, 'i') }
        }
        await PlayerSchema.find(search)
           .then(result => {
                resolve(result);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};


