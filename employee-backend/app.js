
const express = require('express');
var app=new express();
app.use(express.json());
app.use(express.urlencoded({extented:false}));



const cors=require('cors');
app.use(cors());
const mongoose=require('mongoose');
const employee = require('./routes/api/employeeData');
const user = require('./routes/api/loginData');

mongoose.connect('mongodb+srv://sahla:sahlaAtlas@cluster0.2wlvq8k.mongodb.net/EmployeeDB?retryWrites=true&w=majority',
{
    useNewUrlParser:true
});
/**/
const path = require('path');
app.use(express.static(path.join(__dirname,'/build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html')); });

    app.use('/api/employee',employee);
    app.use('/api/user',user);
    

//Running server at port 8082
app.listen(8082,()=>
{
    console.log("Server listening to port 8082");
}
)