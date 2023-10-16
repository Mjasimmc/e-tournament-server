import imageSchema from "../models/imageSchema.js"
import { addingBannerImagesToTournament } from "./tournament.js"


export const UploadImageProfile = async (image, no, typeOfImage, user, uploadedDate) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (no === 1) {
                const imageSaved = await new imageSchema({
                    image: [image],
                    typeOfImage,
                    user,
                    uploadedDate
                }).save()
                resolve(imageSaved)
            } else {
                const imageSaved = await imageSchema.findOneAndUpdate({ user, typeOfImage }, {
                    $push: {
                        image: image
                    }
                })
                const Image = await imageSchema.findOne({ _id: imageSaved._id })
                resolve(Image)
            }
        } catch (error) {
            reject(error)
        }
    })
}

// removing image with image user and type of image profile
export const removeImage = async (user, typeOfImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            await imageSchema.findOneAndRemove({ user: user, typeOfImage })
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

// getting image with type and user
export const getProfileImageWithUser = async (user, typeOfImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Image = await imageSchema.findOne({ user: user._id, typeOfImage })
            if (Image) {
                resolve(Image.image.join(''))
            } else {
                resolve('')
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}


export const UploadBanner = async (image, no, typeOfImage, user, uploadedDate, _id, tournamentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (no === 1) {

                const imageSaved = await new imageSchema({
                    image: [image],
                    typeOfImage,
                    user,
                    uploadedDate
                }).save()

                await addingBannerImagesToTournament({ image: imageSaved._id, _id: tournamentId })
                resolve(imageSaved)
            } else {
                const imageSaved = await imageSchema.findOneAndUpdate({ _id, typeOfImage }, {
                    $push: {
                        image: image
                    }
                })
                resolve(imageSaved)
            }
        } catch (error) {
            reject(error)
        }
    })
}


export const getImageWithId = async (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const Image = await imageSchema.findOne({ _id: _id })
            if (Image) {
                resolve(Image.image.join(''))
            } else {
                resolve('')
            }
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}