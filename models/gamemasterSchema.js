import mongoose from "mongoose";
const gamemaster = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    ,
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    profilepic: {
        type: Boolean,
        default: false
    },
    CreateTournament: {
        tournamentid: {
            type: mongoose.Types.ObjectId,
            ref: 'tournament'
        },
        tournamentupdate: {
            type: Boolean,
            default: false
        }
    },
    block: {
        type: Boolean,
        default: false
    },
    delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export default mongoose.model("gamemaster", gamemaster)

