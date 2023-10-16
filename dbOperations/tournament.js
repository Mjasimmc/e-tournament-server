import tournamentSchema from "../models/tournamentSchema.js"
import { updateCreateTournament } from "./gamemaster.js"


export const getTournamentDataWithId = async ({ _id, user }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await tournamentSchema.findOne({ _id })
                .then((res) => {
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
        } catch (error) {
            reject(error)
        }
    })
}
export const createNewTournamentData = async ({ name, game, user }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const newTournament = await new tournamentSchema({
                name, game, user
            }).save()
                .then(async (res) => {
                    await updateCreateTournament({
                        tournamentid: res._id,
                        tournamentupdate: true,
                        _id: user
                    }).then(() => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).catch((err) => {
                    reject(err)
                })
        } catch (error) {
            reject(error)
        }
    })
}
export const addingBannerImagesToTournament = async ({ image, _id }) => {
    return new Promise(async (resolve, reject) => {
        try {

            await tournamentSchema.findOneAndUpdate({ _id }, {
                $push: {
                    images: image
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const UpdateTournamentData = async (
    { name, game, _id, deadline, minplayers, teams_no,
        images, description, rules, user
    }) => {
    return new Promise(async (resolve, reject) => {
        const status = 1
        try {
            const tournament = await tournamentSchema.findOneAndUpdate({ _id }, {
                $set: {
                    name, game,
                    deadline, minplayers,
                    teams_no, images
                    , description, rules, status
                }
            }).then(async (res) => {
                await updateCreateTournament({
                    tournamentupdate: false,
                    _id: user
                }).then(() => {
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            }).catch((err) => {
                reject(err)
            })
            resolve(tournament)
        } catch (error) {
            reject(error)
        }
    })

}

export const GetAllTournamentsForGamemaster = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await tournamentSchema.find({ user: _id })
                .then((res) => {
                    console.log(res)
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
        } catch (error) {
            reject(error)
        }
    })
}

export const GetTournaments = async () => {
    return new Promise(async (resolve, reject) => {
        await tournamentSchema.find({ status: 1 })
            .then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log(err)
                reject(err)
            })
    })
}
export const teamRegisterTournament = async (tournamentid, teamid) => {
    try {
        return new Promise(async (resolve, reject) => {
            await tournamentSchema.findOneAndUpdate({
                _id: tournamentid
            }, {
                $push: {
                    teams: {
                        teamid: teamid
                    }
                }
            })
                .then((res) => {
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })

    } catch (error) {
        console.log(error)
        throw error
    }
}
export const registeredTournaments = (teamId) => {
    return new Promise((resolve, reject) => {
        tournamentSchema.find({ 'teams.teamid': teamId })
            .populate('teams.teamid')
            .then((res) => {
                resolve(res)
            }).catch((err) => reject(err))
    })
}

export const filteredData = (name) => {
    return new Promise((resolve, reject) => {
        let query = []
        if (name) {
            query.push({ 'name': { $regex: new RegExp(`^${name}`, 'i') } })
            query.push({ 'game': { $regex: new RegExp(`^${name}`, 'i') } })
        }
        let SearchFor =  name? { $or: query }:{}
        tournamentSchema.find({...SearchFor,status: 1})
            .then((res) => resolve(res))
            .catch(err => reject(err));
    });
}