import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// Protected Routes Token Based
export const requireSignIn = async (req,res,next) =>{
    try {
        const decode = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        });
    }
}


// Admin
export const isAdmin = async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !==1){
            return res.status(401).send({
                success:false,
                message:"UnAuthorised User"
            })
        }
        else{
            next();
        }
    } catch (error) {
        return res.status(401).send({
            success:false,
            message:`${req.user.email}Error in Admin Middleware ${error} ${req.user.role}`,

        })
    }
}