import { GetTournaments } from "../../dbOperations/tournament.js"


export const getAllTournaments = async(req,res) =>{
    try {
        await GetTournaments()
        .then(data =>{
            res.status(200).send(data)
        })
    } catch (error) {
        res.status(200).send({message:'internalserver error'})
    }
}