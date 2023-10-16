
import bcrypt from 'bcrypt'
import { createNewGameMaster, findGameMasterWithEmail, getGamemasterData } from '../../dbOperations/gamemaster.js';
import { UploadImageProfile, getProfileImageWithUser, removeImage } from '../../dbOperations/image.js';
import { createJwtToken } from '../../middlewares/jwtAuthentication.js'


export const authenticateGamemaster = async (req, res) => {
    try {
        const user = await getGamemasterData(req.user._id)
        if (user) {
            const { name, email, _id, profilepic, CreateTournament } = user
            const token = await createJwtToken({ _id })
            res.status(200).send({ message: "connected", user: { name, token, email, profilepic, CreateTournament } })
        } else {
            res.status(404).send({ message: 'User not authenticated' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

export const registerGamemaster = async (req, res, next) => {
    try {
        const { email, name, password, phone } = req.body
        await findGameMasterWithEmail(email)
            .then(async (data) => {
                if (data) {
                    return res.status(409).send({ message: "Email already exist" })
                }
                let hashedPassword = bcrypt.hashSync(password, 12);
                await createNewGameMaster(name, email, phone, hashedPassword)
                    .then(async (data) => {
                        const { name, email, _id, profilepic, CreateTournament } = data
                        const token = await createJwtToken({ _id })
                        res.status(200).send({ message: "connected", user: { name, token, email, profilepic, CreateTournament } })
                    }).catch((err) => {
                        res.status(400).send({ message: "Internal server error" })
                    })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

export const signInGamemaster = async (req, res) => {
    try {
        const { email, password } = req.body
        await findGameMasterWithEmail(email)
            .then(async (user) => {
                if (!user || !await bcrypt.compare(password, user?.password)) {
                    return res.status(404).send({ message: "invalid email or password" })
                } else {
                    const { name, email, _id, profilepic, CreateTournament } = user
                    const token = await createJwtToken({ _id })
                    res.status(200).send({ message: "connected", user: { name, token, email, profilepic, CreateTournament } })
                }
            }).catch(err => {
                console.log(err)
                res.status(500).send({ message: "Internal server error" })
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal server error" })
    }
}

// google authentication
export const signInWithGoogleGamemaster = async (req, res) => {
    try {
        const { email } = req.body
        const data = await findGameMasterWithEmail(email)
        if (data) {
            const { name, email, _id, profilepic, CreateTournament } = data
            const token = await createJwtToken({ _id })
            res.status(200).send({ message: "connected", user: { name, token, email, profilepic, CreateTournament } })
        } else {
            res.status(401).send({ message: 'user not found' })
        }
    } catch (error) {
        console.log(error)
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
            await removeImage(user._id, typeOfImage)
        }
        await UploadImageProfile(image, index, typeOfImage, user, uploadedDate)
            .then(({ image }) => {
                res.status(200).send({ image: image.join('') })
            }).catch(() => {
                res.status(500).send({ message: "Internal server error" })
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
        console.log(error)
        res.status(500).send({ message: 'Internal server error' })
    }

}

