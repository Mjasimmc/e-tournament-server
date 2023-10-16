import {
    CreateNewTeam,
    exitTeamWithTeamId,
    getTeamDatas,
    joinTeamWithJoinId
} from "../../DbOperations/team.js"
function createUniqueCodeWithName(name) {
    const code = Math.floor(Math.random() * 10000);
    let uName = name.trim().toUpperCase()
    return `${uName}${code}`
}

export const createTeam = (req, res, next) => {
    try {
        const { name } = req.body
        const _id = req.user._id
        const joinId = createUniqueCodeWithName(name)
        CreateNewTeam({ joinId, name, _id })
            .then((data) => {
                res.status(200).send(data)
            }).catch((err) => {

                res.status(500).send(err)
            })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const getTeamDataForMember = (req, res, next) => {

    try {
        const { teamId } = req.query
        getTeamDatas(teamId)
            .then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                res.status(500).send(err)
            })
    } catch (error) {
        next(error)
    }
}
export const playerJoinTeam = async (req, res, next) => {
    try {
        const { joinId } = req.body
        if (!joinId) return res.status(401).send('join id not found')
        const teamData = await joinTeamWithJoinId(req.user._id, joinId)
        res.status(200).send(teamData)
    } catch (error) {
        next(error)
    }
}

export const playerExitTeam = async (req, res, next) => {
    try {
        const { teamId } = req.body
        if (!teamId) return res.status(401).send('team id not found')
        const teamData = await exitTeamWithTeamId(req.user._id, teamId)
        res.status(200).send(teamData)
    } catch (error) {
        next(error)
    }
}