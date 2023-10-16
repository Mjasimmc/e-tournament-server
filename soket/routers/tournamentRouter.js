// Tournament
import Express from "express"
import { JwtConfig } from "../../middlewares/jwtAuthentication.js";
import {
    UpdateTournament,
    createNewTournament,
    getBannerImagesWithId,
    getGamemasterTournaments,
    getTournamentData,
    uploadBannerImages
} from "../../controllers/tournamentController/gamemaster.js";
import { getAllTournaments } from "../../controllers/tournamentController/getTournament.js";
const router = Express()
router.post('/create-new', JwtConfig, createNewTournament)


router.post('/upload-image', JwtConfig, uploadBannerImages)
router.post('/create-tournament', JwtConfig, UpdateTournament)



router.get('/get-data', JwtConfig, getTournamentData)
router.get('/get-image', JwtConfig, getBannerImagesWithId)

router.get('/gamemaster-tournaments',JwtConfig,getGamemasterTournaments)


router.get('/all-tournaments',JwtConfig,getAllTournaments)

export default router