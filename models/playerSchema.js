import mongoose, { mongo } from "mongoose";
const player = mongoose.Schema({
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
    team:{
        status:{
            type:Boolean,
            default:false
        },
        id:{
            type:String,
            default:''
        }
    },
    games:[String],
    block:{
        type:Boolean,
        default:false
    },
    delete:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
export default mongoose.model("player", player)