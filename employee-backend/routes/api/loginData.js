const express = require('express');
const { UserModel } = require('../../model/users');
const router=express.Router();
const bcrpt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.post("/api/signup",async(req,res)=>{

    let data = new UserModel({ username: req.body.username, 
        password: bcrpt.hashSync(req.body.password,10),
        usertype:req.body.usertype })
    console.log(data)
    await data.save()
    res.json({"status":"success","data":data})

})

router.post('/signin',async(req,res)=>{
    var getUsername=req.body.username
    var password=req.body.password

    let result=UserModel.find({username:getUsername},(err,data)=>{

        if(data.length>0){
            const passwordValidator=bcrpt.compareSync(password,data[0].password)
            if(passwordValidator){

                jwt.sign({username:getUsername,id:data[0]._id},"myKey",{expiresIn:"1d"},
                (err,token)=>{
                    if (err) {
                        res.json({"status":"error","error":err})

                    } else {
                        res.json({"status":"success","data":data,"token":token})
                    }
                })            
            }
            else{
                res.json({"status":"failed","data":"invalid password"})
            }
        }
        else{
            res.json({"status":"failed","data":"invalid email id"})
        }
    })
})

router.post('/logincheck',(req,res)=>{

    jwt.verify(req.body.token,"myKey",(err,decoded)=>{
        if(decoded && decoded.username){
            res.json({"status":"success"})
        }
        else{
            res.json({"status":"Unauthorised user"})
    
        }
       })
    })
module.exports= router;