import express ,{Request,Response} from 'express'
import User from '../models/user'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import  {check, validationResult } from "express-validator"
import verifyToken from '../Middleware/auth'
const router=express.Router()
// /api/users/register
router.post("/login", [
    check("email","Email is required").isEmail(),
    check("password","Password should be more than or equal to 6 characters").isLength({min:6})

],async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try{
        const user=await User.findOne({
            email
        })
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password)        
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token=jwt.sign(
            {user_Id:user.id},
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn:"1d"
            }
        )
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000,
            
        })
        res.status(200).json({userId:user._id})
    }catch(error){
        console.log(error);
        res.status(500).send({message:"Something went Wrong"})
    }
})
router.get("/validate-token",verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})//verifyToken :middleware to check for token

router.post("/logout",(req:Request,res:Response)=>{
    res.cookie("auth_token","",{
        expires:new Date(0)
    })
    res.send()
})
export default router