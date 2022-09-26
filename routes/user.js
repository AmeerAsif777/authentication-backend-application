import express from "express";
const router = express.Router();
import multer from "multer";
import fs from "fs";
import { login, signup, update,viewProfile } from "../controllers/user.js";
import ModelSchemaOfUser from "../models/user.js";
//import uuidv4 from "uuid"
import cloudinary from "cloudinary";
cloudinary.config({
    cloud_name: 'dwkynaaf0',
    api_key: '354688961336311',
    api_secret: '8mlCboG0p2jPEZinjSJmU_hc0ok'
    });

router.post("/login", login);
router.post("/signup", signup);
router.post("/updateProfile", update);
router.get('/viewProfile',viewProfile);

var upload = multer({dest: '..images'});
router.post("/uploadImage",upload.single("avatar"), async (req, res)=>
{
    const user = await ModelSchemaOfUser.findOne({email:req.body.email})
    

    cloudinary.uploader.upload(req.file.path, (result)=>{
        user.profile_pic=result.url;
        user.save();
        return res.json({ public_id: result.public_id, public_url:result.url});
    })
    
});
  
export default router;