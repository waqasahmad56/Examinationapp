import User from '../models/User.js';


export const getUser = async (req,res) =>{
    try{  
        const user = await User.find();
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
}

export const updateUser = async (req,res) =>{
    const {userId} = req.body;
    const {firstname,lastname} = req.body;

    console.log(userId, firstname , lastname);
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(firstname!== undefined) user.firstname = firstname;
        if(lastname !== undefined) user.lastname = lastname;

        const updateUser = await user.save();
        res.status(200).json(updateUser);

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    
}