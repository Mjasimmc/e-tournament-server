import { findAllGamemasters } from "../../dbOperations/gamemaster.js"
import { findAllPlayers } from "../../dbOperations/playerOprerations.js"
import { getAdminWithEmail } from "../../dbOperations/admin.js"
import { createJwtToken } from "../../middlewares/jwtAuthentication.js"

export const adminLog = async (req, res) => {
    try {
        const { email, password } = req.body
        await getAdminWithEmail(email)
            .then(async (admin) => {
                if (!admin || !admin.password === password) {
                    res.status(404).send({ message: 'Admin Not Found' })
                } else {
                    const token = await createJwtToken({_id:admin._id})
                    res.status(200).send({ message: 'connected',token })
                }
            }).catch(() => {
                res.status(500).send({ message: 'Internal server error' })
            })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}

export const GetUsersData = async (req, res) => {
    try {
        const gamemaster = await findAllGamemasters()
        const player = await findAllPlayers()
        res.status(200).send({ gamemaster, player })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}
