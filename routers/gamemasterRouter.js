// GameMaster
import Express from "express"
import {
    UpdateProfileImage,
    authenticateGamemaster,
    getProfileImage,
    registerGamemaster,
    signInGamemaster,
    signInWithGoogleGamemaster
} from "../controllers/gameMasterController/auth.js";
import { JwtConfig } from "../middlewares/jwtAuthentication.js"

const router = Express()


router.post('/register', registerGamemaster)
router.post('/login', signInGamemaster)

router.get('/auth-gamemaster', JwtConfig, authenticateGamemaster)

router.post('/update-image', JwtConfig, UpdateProfileImage)

router.get('/get-profile-image', JwtConfig, getProfileImage)
router.post('/google-login', signInWithGoogleGamemaster)


export default router