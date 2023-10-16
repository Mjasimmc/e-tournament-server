import  Express  from "express";
import PlayerRouter from "./Routers/PlayerRouter.js"
import gamemasterRouter from "./Routers/gamemasterRouter.js"
import tournamentRouter from "./Routers/tournamentRouter.js"
import adminRouter from "./Routers/adminRouter.js"
// import authGoogle from "./Routers/googleAuth.js"
const api = Express()


api.use("/player",PlayerRouter)
api.use("/gamemaster",gamemasterRouter)
api.use("/tournament",tournamentRouter)
api.use("/admin",adminRouter)
// api.use('/auth',authGoogle)


export default api  
