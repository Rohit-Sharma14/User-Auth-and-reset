const e = require('express')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
// const nodemailer = require('nodemailer')
// const sndgrdtp = require('nodemailer-sendgrid-transport')
// var sg = require('sendgrid')('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');

// const transporter = nodemailer.createTransport(sndgrdtp({
//     auth:{
//         api_key:"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"
//     }
// }))

router.post('/signup',(req,res)=>{
    const {email,name,password} = req.body
    if(!email||!password||!name){
        res.status(422).json({error:"please fill all the details"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            res.status(422).json({error:"User already exists"})
        }
        bcrypt.hash(password,12).then(hashedpassword => {
            const user = new User({
                email,
                name,
                password : hashedpassword
            })
            user.save().then(user => {
                // transporter.sendMail({
                //     to:user.email,
                //     from:"Foodviram",
                //     subject:"signup success",
                //     html:"<h1>Welocome to foodviram</h1>"
                // }).catch(err=>{
                //     console.log(err)
                // })
                res.json({message:"saved succesfully"})
            }).catch(err => {
                console.log(err)
            })
        }).catch(err =>{
            console.log(err)
        })
        })
       
})


router.post('/signin',(req,res)=>{

    const {email , password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then(savedUser => {
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(domatch => {
            if(domatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email}=savedUser
                res.json({token,user:{_id,name,email}})
            } else {
                return res.status(422).json({error:"Invalid email or password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })
})

module.exports=router



//