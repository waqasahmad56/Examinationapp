
import jwt from "jsonwebtoken";
process.env.JWT_SECRET="hfthftjygjhukhukhukyuk";
const key = process.env.JWT_SECRET;

export const verifyToken = async (req,res,next) => {
    try{
        let token = req.headers['authorization']
    
        console.log("token in middleware",token);
       

        if(!token){
            return res.status(403).json({message:"Access Denied"});
        }
        
        if(token){
            token = token.split(" ")[1];
        }
    console.log("token in split",token)
    console.log("hello")
        const verified = jwt.verify(token,key);
        console.log("token verify ",verified)
        if(verified){
            console.log("verify token")
        }else{
            console.log("not verify token")
        }
        req.token = verified;
        next();
    }
    catch(error){
        res.status(403).json({message:error.message}); 
    }
}
