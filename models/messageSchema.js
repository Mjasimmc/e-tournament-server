import mongoose from "mongoose";   


const messageSchema = mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    sender:{
        type: mongoose.Schema.ObjectId,
        ref:'player'
    },
    chatId:{
        type: mongoose.Schema.ObjectId,
        ref:'chat'
    }
},{
    timestamps:true
})

export default mongoose.model("message",messageSchema)