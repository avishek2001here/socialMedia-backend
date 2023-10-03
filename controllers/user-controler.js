import User from "../model/User.js";
import bcrypt from "bcrypt";

export const getAllUser=async(req,res,next)=>{
    let users;  
    try{
        users=await User.find();
    }
    catch(err)
    {
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:'No user found'});
    }
    return res.status(200).json({users});
}
export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;
    let exitingUser;
    try{
        exitingUser=await User.findOne({email});

    }
    catch(err)
    {
        return console.log(err);
    }
    if(exitingUser)
    return res.status(400).json({message:"User already exists,Login instead"});
    const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
    const user=new User({
        name,email,password:hash
    });
    try{
        await user.save();
    }
    catch(err){
      return  console.log(err);
    }
    return res.status(201).json({user});
}
export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    let exitingUser;
    try{
        exitingUser=await User.findOne({email});

    }
    catch(err)
    {
        return console.log(err);
    }
    if(!exitingUser)
    return res.status(400).json({message:"Pls signup"});
    
    if(!bcrypt.compareSync(password,exitingUser.password))
    return res.status(400).json({message:"Wrong Credentials"});

    return res.status(201).send({message:"login successfull"});
}