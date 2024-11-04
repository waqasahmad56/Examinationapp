const express=require("express");
const jwt=require("jsonwebtoken");
const app=express();
const secretKey = "sudgpoigehge"
app.get("/",(req,res)=>{
    res.json({
        message:"a sample quiz"
    })
})
app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"waqas",
        email:"abc@gmail.com"

    }
    jwt.sign({user},secretKey,{expiresIn:"300s"},(err,token)=>{
        res.json({token})
    })
})
app.listen(5000,()=>{
    console.log("app is running 5000");
})