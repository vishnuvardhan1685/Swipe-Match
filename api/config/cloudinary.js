import dotenv from 'dotenv';
dotenv.config({ path: './api/.env' }); 

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY); 
export default cloudinary;