// Tournament
import Express from "express"
import {
    GetUsersData,
    adminLog,
} from "../controllers/adminController/auth.js"
import {
    blockPlayer,
    deletePlayer,
    revivePlayer,
    unBblockPlayer
} from "../controllers/adminController/player.js";
import { blockGamemaster, deleteGamemaster, reviveGamemaster, unBblockGamemaster } from "../controllers/adminController/gamemaster.js";
const router = Express()



router.post('/sign-in', adminLog);

router.get('/get-user-data', GetUsersData)
router.post('/block-player', blockPlayer)
router.post('/unblock-player', unBblockPlayer)
router.post('/delete-player', deletePlayer)
router.post('/revive-player', revivePlayer)

router.post('/block-gamemaster', blockGamemaster)
router.post('/unblock-gamemaster', unBblockGamemaster)
router.post('/delete-gamemaster', deleteGamemaster)
router.post('/revive-gamemaster', reviveGamemaster)


export default router