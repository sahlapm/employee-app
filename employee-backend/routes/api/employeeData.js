const express = require('express');
const { EmployeeModel } = require('../../model/employee');
const router=express.Router();
const bcrpt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post('/create',(req,res)=>{

    jwt.verify(req.body.token,"myKey",(err,decoded)=>{
        if(decoded && decoded.username){
       
            let data = new EmployeeModel({ 
                name: req.body.name, 
                position: req.body.position,
                location:req.body.location,
                salary:req.body.salary
            })
    
              data.save()
              res.json({"status":"success"})
    
    
        }
        else{
            res.json({"status":"Unauthorised user"})
    
        }
       })   
})

    // tests employee route
router.get('/test', (req, res) => res.send('employee route testing'));
router.get('/read',async(req,res)=>{
try
{
 const data=await EmployeeModel.find()
  res.send(data);
}
catch(err)
{
    res.status(400).json({error:"No employee to display"});
}  
})

router.put('/update/:id',async(req,res)=>{
  try {
    let id=req.params.id;
const data= await EmployeeModel.findOneAndUpdate({"_id":id},req.body)
res.json({"status":"success"})
}
catch (error)
{
    res.status(400).json({error:"No employee updated"});
}
   
})

router.delete('/delete/:id',async(req,res)=>{           
    try
    {
        let id=req.params.id;
       const data= await EmployeeModel.findOneAndDelete({"_id":id},req.body);
       res.json({"status":"success"})
    }
    catch (error)
    {
        res.status(400).json({error:"No employee deleted"});
    }
   
})
module.exports= router;
