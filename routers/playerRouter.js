// Player
import Express from "express";
import {
    autheticatePlayer,
    gamesListAdding,
    gamesListRemoving,
    getProfileImage,
    registerPlayer,
    signInPlayer,
    signInWithGooglePlayer,
    updatePlayer,
    UpdateProfileImage,
} from "../controllers/playerController/auth.js";

import { JwtConfig } from "../middlewares/jwtAuthentication.js";
import {
    createTeam,
    getTeamDataForMember,
    playerExitTeam,
    playerJoinTeam
} from "../controllers/playerController/team.js";
import {
    registeredTournamentData,
    // sendRegisterRequestForTournament,
    sortedTournamentData
} from "../controllers/tournamentController/players.js";
import { createChat, getAllChatsOfPlayers, getAllMessages, sendMessageToPlayer } from "../controllers/playerController/Chat.js";
import { searchPlayersData } from "../controllers/playerController/search.js";
import { 
    getAlltournamentsForPlayer, 
    sendRegisterRequestForTournament
 } from "../controllers/playerController/tournament.js";

const router = Express()




router.get('/auth-player', JwtConfig, autheticatePlayer)
// for registering a new Player also gives token for sign In

router.post('/register', registerPlayer)

// for signIn a player and creating a new token
router.post('/login', signInPlayer)

router.post('/update-image', JwtConfig, UpdateProfileImage)

router.get('/get-profile-image', JwtConfig, getProfileImage)

router.post('/google', signInWithGooglePlayer)


router.post('/create-team', JwtConfig, createTeam)
router.get('/get-team', JwtConfig, getTeamDataForMember)
router.post('/join-team', JwtConfig, playerJoinTeam)
router.post('/exit-team',JwtConfig,playerExitTeam)



router.post('/add-game-to-list', JwtConfig, gamesListAdding)
router.post('/remove-game-to-list', JwtConfig, gamesListRemoving)

router.post('/update-player',JwtConfig,updatePlayer)


// chat routers
router.post('/new-chat',JwtConfig,createChat)
router.get('/allchats-player',JwtConfig,getAllChatsOfPlayers)

router.get('/get-all-player-messages',JwtConfig,getAllMessages)

// searchPlayers   getAllChatsOfPlayers
router.get('/search-players',JwtConfig,searchPlayersData)
router.post('/send-message-to-player',JwtConfig,sendMessageToPlayer)

// tournaments
router.get('/all-tournaments',JwtConfig,getAlltournamentsForPlayer)
router.post('/req-reg-team-tournament', JwtConfig, sendRegisterRequestForTournament)
router.get('/get-tournaments-registered/:teamId', JwtConfig, registeredTournamentData)
router.get('/sorted-tournament-data', JwtConfig, sortedTournamentData)

export default router
