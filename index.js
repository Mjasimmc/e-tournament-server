import Express from "express";
import cors from "cors"
import env from "dotenv"
import { dbConnection } from "./Connections/db.js";
import api from "./api.js";
import http from 'http';
import { Server } from "socket.io";
import { playerConnected } from "./soket/chatSocket.js";
import bodyParser from "body-parser";

env.config()
dbConnection(process.env.DATABASEcONNECTION)
const app = Express()
const newApp = http.createServer(app)

app.use(cors());

const io = new Server(newApp, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
})
io.on('connection', playerConnected);

app.use(Express.static('public'));
app.use(Express.json({ limit: '30mb', extended: true }));
app.use(Express.urlencoded({ limit: '30mb', extended: true }));
app.use((req,res,next)=>{
    console.log(req.url)
    next()
})


app.use("/api", api)

app.use((err, req, res, next) => {
    const statusCode = err.response ? err.response.status : 500;
    const errorMessage = err.message || 'Internal Server Error';
    console.error(err);

    res.status(statusCode).json({
        error: errorMessage,
        status: statusCode,
    });
});
app.use("/*", (req, res) => {
    res.status(404).send({ message: 'request not found' })
})

const port = process.env.PORT || 4001;
newApp.listen(port, () => console.log("server is running on PORT " + port))