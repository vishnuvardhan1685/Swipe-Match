import { config } from 'dotenv';
config({
    path: "./api/.env"
})
import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
export const updateProfile = async (req,res) => {
    // image => cloudinary => image.cloudinary.your => mongoDB
    try {
        const { image, ...otherData } = req.body;
        console.log(req.body)

        let updateData = otherData;

        if(image){
            if(image.startsWith("data:image")){
                try {
                    const uploadResponse = await cloudinary.uploader.upload(image);
                    updateData.image = uploadResponse.secure_url;
                } catch (error) {
                    console.error("Error uploading image:", error);
                    return res.status(500).json({
                        success: false,
                        message: "Image uplod error.Profile update aborted",
                    })
                }
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {new: true});
        res.status(200).json({
            success: true,
            user: updatedUser
        })
    } catch (error) {
        console.log("Error in updateProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}