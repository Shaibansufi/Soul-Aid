import userModel from '../models/userModel.js';
import { ComparePassword, hashPassword } from '../helpers/authHelper.js';
import  jwt  from 'jsonwebtoken';


export const registerController = async (req,res) =>{
    try{
        const  {name,email,phone,address,password,role,answer} = req.body
        //Validations
        if(!name){
            return res.send({message:'Name is Required'});
        }
        if(!email){
            return res.send({message:'Email is Required'});
        }
        if(!password){
            return res.send({messge:'Password is Required'});
        }
        if(!phone){
            return res.send({message:'Phone is Required'});
        }
        if(!address){
            return res.send({message:'Address is Required'});
        }
        if(!answer){
            return res.send({message:'Answer is Required'});
        }
        // if(!role){
        //     return res.send({message:'Role is Required'});
        // }
        // check user
        const existingUser = await userModel.findOne({email})
        // existing user
        if(existingUser){
            return res.status(200).send({
                sucess:false,
                message:'Already Register please login',
            })
        }
        // register user
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({
            name,
            email, 
            phone,
            address,
            password:hashedPassword,
            role,
            answer
            }).save()
        res.status(201).send({
            sucess:true,
            message:'User Register Successfully',
            user
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message:'Error in Registeration',
            error
        })
    }
};


// POST LOGIN
export const loginController = async (req,res) => {
    try{
        const {email,password} = req.body
        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user = await userModel.findOne({email})
        // check user
        if (!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registerd"
            })
        }
        const match = await ComparePassword(password,user.password) 
        // password Compare
        if (!match){
            return res.status(200).send({
                success:false,
                message:"Incorrect Password"
            })
        }
        // Token
        const token = await jwt.sign({_id:user.id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:"User Logged In Successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },token,
        })
    }
    catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
};


// ForgotPaswordController || Post
export const forgotPasswordController = async (req,res)=>{
    try{
        const {email,answer,newPassword} = req.body
        if(!email){
            res.status(400).send({message:'Email is Required'})
        }
        if(!answer){
            res.status(400).send({message:'Answer is Required'})
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is Required'})
        }
        // check
        const user = await userModel.findOne({email,answer})
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer '
            })
        }
        // make newpassword as hash password in order to store using hashpassword
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })

    }
    catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went Wrong",
            error
        })
    }
}

// GEt || TEst Controller
export const testController = async (req,res) => {
    res.send("Protected Routes  ");
};