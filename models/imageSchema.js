import mongoose from 'mongoose'
const ImageSchema = mongoose.Schema({
    image:[String],
    typeOfImage:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    uploadedDate:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model('image',ImageSchema)