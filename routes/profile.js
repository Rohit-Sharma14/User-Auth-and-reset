
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const login = require('../middleware/authentication')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')

router.post('/profile',login,(req,res)=>{
    const id = req.user.id
    //console.log(req.user)
    User.findOne({_id:id}).then(data =>{
        res.json({data})
    })
})
router.post('/check',login,(req,res)=>{
    
    const cpwd = req.body.password
    console.log(req.body.password,req.user.password)
    User.findById(req.user.id).then(data =>{
        bcrypt.compare(cpwd,data.password)
        .then(match => {
            if(match){
                res.json({message:"correct password you can password now"})
            } else {
                res.json({error:"invalid password"})
            }
        }).catch(err => {
            console.log(err)
        })
    })
    
})

router.post('/change',login,(req,res)=>{
    bcrypt.hash(req.body.pwd1,12).then(hashed => {
        User.findByIdAndUpdate({_id:req.user.id},{password : hashed})
        .then(data => {
            res.json({success:"Successfully changed"})
        })
    })
   
})


module.exports=router