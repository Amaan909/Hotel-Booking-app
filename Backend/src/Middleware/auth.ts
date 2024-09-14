import { NextFunction ,Request,Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    console.log("verifyToken called");
    const token=req.cookies["auth_token"]
    console.log("Request URL:", req.originalUrl); // Log the URL of the request
    console.log("Cookies from client:", req.cookies);
    if(!token){
        console.error("No token found in cookies");
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string)
        console.log("Decoded JWT:", decoded);
        req.userId=(decoded as JwtPayload).userId
        next()
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized"})
    }
}
export default verifyToken