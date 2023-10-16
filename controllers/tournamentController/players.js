import {
    filteredData,
    registeredTournaments,
    teamRegisterTournament
} from "../../dbOperations/tournament.js"

// export const sendRegisterRequestForTournament = async (req, res) => {
//     try {
//         const { teamid, tournamentId } = req.body
//         const updateRes = await teamRegisterTournament(tournamentId, teamid)
//         res.status(200).send(updateRes)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("internal server error")
//     }
// }
export const registeredTournamentData = async (req, res) => {
    try {
        const { teamId } = req.params
        const tournaments = await registeredTournaments(teamId)
        res.status(200).send(tournaments)
    } catch (error) {
        res.status(500).send('internal server error')
    }
}
export const sortedTournamentData = async (req, res) => {
    try {
        const search = req.query.search || ""
        const data = await filteredData(search)
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}