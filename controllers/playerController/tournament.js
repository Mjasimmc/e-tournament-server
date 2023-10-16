import { GetTournaments, teamRegisterTournament } from "../../dbOperations/tournament.js"

export const getAlltournamentsForPlayer = async (req, res) => {
    try {
        const tournaments = await GetTournaments()
        return res.status(201).json(tournaments)
    } catch (error) {
        res.status(500).send('inteernal serveer error')
    }
}
export const sendRegisterRequestForTournament = async (req, res) => {
    try {
        const { teamid, tournamentId } = req.body
        const updateRes = await teamRegisterTournament(tournamentId, teamid)
        res.status(200).send(updateRes)
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
}