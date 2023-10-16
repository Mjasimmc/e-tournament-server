import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    specialKey:{
        type:String
    },
    name:{
        type:String
    }
})
export default mongoose.model('admin',adminSchema);
