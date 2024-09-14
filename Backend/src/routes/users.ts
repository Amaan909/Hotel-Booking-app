import express ,{Request,Response} from 'express'
import User from '../models/user'
import jwt from "jsonwebtoken"
import  {check, validationResult } from "express-validator"
const router=express.Router()
// /api/users/register
router.post("/register", [
    check("email","Email is required").isEmail(),
    check("firstname","FirstName is required").isString(),
    check("lastname","LastName is required").isString(),
    check("password","Password should be more than or equal to 6 characters").isLength({min:6})

],async(req:Request,res:Response)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let user=await User.findOne({
            email:req.body.email,
        })
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        user=new User(req.body)
        await user.save()

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
            maxAge:86400000
        })
        return res.status(200).send({message:"User registered successfuly"})
    }catch(error){
        console.log(error);
        res.status(500).send({message:"Something went Wrong"})
    }
})

export default router