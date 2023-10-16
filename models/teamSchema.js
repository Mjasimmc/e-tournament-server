import mongoose, { mongo } from "mongoose";
const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    joinId: {
        type: String,
        required: true
    },
    admin:{
        type:String,
        required:true
    },
    members: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'player'
            },
            access:{
                type:Number,
                default : 0
            }
        }
    ],
    requests:[String]

},{timestamp:true})
export default mongoose.model("team", teamSchema)