import mongoose from "mongoose";
const tournamentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'gamemaster'
    },
    deadline: {
        type: Date,
    },
    minplayers: {
        type: Number,
    }, teams_no: {
        type: Number
    },
    images: [String],
    status: {
        type: String,
        default: 0
    },
    description: {
        type: String
    },
    rules: [String],
    teams:[{
        teamid:{
            type:mongoose.Schema.ObjectId,
            ref:'team'
        },
        status:{
            type:Boolean,
            default:false
        }
    }]
},{
    timestamps:true
})


export default mongoose.model('tournament', tournamentSchema)