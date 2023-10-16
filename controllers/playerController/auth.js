
import bcrypt from 'bcrypt'
import { createJwtToken } from '../../middlewares/jwtAuthentication.js'

import { addGamesToPlayers, createNewPlayer, findPlayerWithEmail, getPlayerData, removeGamesToPlayers, updatePlayerData } from '../../dbOperations/playerOprerations.js'
import { UploadImageProfile, getProfileImageWithUser, removeImage } from '../../dbOperations/image.js'

export const autheticatePlayer = async (req, res) => {
    try {
        const data = await getPlayerData(req.user._id)
        if (data) {
            const { _id, profilepic, email, team, name, games } = data
            const token = await createJwtToken({ _id ,user:"player"})
            res.status(200).send({ message: "connected", user: { name, email, profilepic, token, team, games,_id } })
        } else {
            res.status(404).send({ message: 'User not authenticated' })
        }
    } catch (error) {
        return res.status(404).send({ message: 'Data not found' })
    }
}

export const registerPlayer = async (req, res, next) => {
    try {
        const { email, name, password, phone } = req.body
        await findPlayerWithEmail(email)
            .then((data) => {
                if (data) {
                    return res.status(409).send({ message: "Email already exist" })
                }
                let hashedPassword = bcrypt.hashSync(password, 12);
                createNewPlayer(name, email, phone, hashedPassword)
                    .then(async (data) => {
                        const { _id, profilepic, team, games } = data
                        const token = await createJwtToken({ _id,user:"player" })
                        res.status(200).send({ message: "connected", user: { name, email, profilepic, token, team, games,_id } })
                    }).catch(err => {
                        console.log(err)
                        res.status(500).send({ message: "Internal server error" })
                    })
            }).catch((err) => {
                console.log(err)
                return res.status(500).send({ message: 'Internal server error' })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

export const signInPlayer = async (req, res) => {
    try {
        const { email, password } = req.body

        await findPlayerWithEmail(email)
            .then(async (data) => {
                if (!data || !await bcrypt.compare(password, data?.password)) {
                    return res.status(404).send({ message: "invalid email or password" })
                }
                const { _id, profilepic, team, name, email, games } = data
                const token = await createJwtToken({ _id,user:"player" })
                res.status(200).send({ message: "connected", user: { name, email, profilepic, token, team, games ,_id} })
            }).catch(err => {
                console.log(err)
                res.status(500).send({ message: "Internal server error" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

export const signInWithGooglePlayer = async (req, res) => {
    try {
        const { email } = req.body
        await findPlayerWithEmail(email)
            .then(async (data) => {
                const { _id, profilepic, team, name, email, games } = data
                const token = await createJwtToken({ _id,user:"player" })
                res.status(200).send({ message: "connected", user: { name, email, profilepic, token, team, games,_id } })
            }).catch(() => {
                res.status(500).send({ message: "user not found" })
            })
    } catch (error) {

        res.status(500).send({ message: "Internal server error" })
    }
}
export const UpdateProfileImage = async (req, res) => {
    try {
        const { user } = req
        const { image, index } = req.body
        const uploadedDate = new Date().toDateString()
        const typeOfImage = 'profile'
        if (index === 1) {
            await removeImage(user, typeOfImage).then(() => {
            })
        }
        await UploadImageProfile(image, index, typeOfImage, user._id, uploadedDate)
            .then(({ image }) => {
                res.status(200).send({ image: image.join('') })
            })

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}
export const getProfileImage = async (req, res) => {
    try {
        const user = req.user
        const typeOfImage = 'profile'
        const image = await getProfileImageWithUser(user, typeOfImage)
        res.status(200).send({ image })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}

export const gamesListAdding = async (req, res) => {
    try {
        const { game } = req.body
        const result = await addGamesToPlayers(game, req.user._id)
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send("retry")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}
export const gamesListRemoving = async (req, res) => {
    try {
        const { game } = req.body
        const result = await removeGamesToPlayers(game, req.user._id)
        console.log(result)
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).send("retry")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}

export const updatePlayer = async (req, res) => {
    try {
        const { name, email } = req.body
        const data = await updatePlayerData(name, email, req.user._id)
        if (data) {
            const {  name, email } = data
            res.status(200).send({ message: "connected", user: { name, email } })
        }else{
            res.status(400).send('bad request')
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }
}