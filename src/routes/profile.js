const express = require('express');
const userAuth = require("../middleware/auth");
const userModel = require('../models/user');
const {validateEditProfileData} = require("../utils/validation");
const bcrypt = require('bcrypt');


const profileRouter = express.Router();
//profileRouter.use(express.json);

profileRouter.get("/profile/view", userAuth, async (req, res)=>{
    try{
      const user = req.user;
      res.send(user);
    }catch(err){
      res.status(400).send("Error:" + err.message);
    };

});

profileRouter.patch('/profile/edit', userAuth, async(req, res)=>{
    try{
        if(!validateEditProfileData(req)){
            return res.status(400).send("Bad Request Can't edit profile")
        }

        const loggedInUser = req.user; // Receiving the particular user which is requested for upon login from the middleware userauth
        // console.log(`user id inside profile edit ${loggedInUser}`);
        // console.log(`requested body ${req.body}`);
        
        Object.keys(req.body).forEach((key)=>{loggedInUser[key] = req.body[key]}) // here
        // console.log(`user object after edit ${loggedInUser}`);
        await loggedInUser.save();

       res.json({
        message : `${loggedInUser.firstName} your profile updated successfully!!`,
        data: loggedInUser
        });
    }catch(err){
        res.status(400).send(`Bad Request ${err}`)
    }
});

profileRouter.patch('/profile/password', userAuth, async(req, res)=>{
    try{
    const loggedInUser = req.user;
    console.log(`User inside password api ${loggedInUser}`);

    const newPassword = req.body.password;
    console.log(`New password ${newPassword}`);
    
    const hashNewPassword = await bcrypt.hash(newPassword, 10);
    console.log(`hashed new password ${hashNewPassword}`);
    loggedInUser.password = hashNewPassword;

    await loggedInUser.save();

    res.json(`message: ${loggedInUser.firstName} password changed successfully!`);
    }catch(err){
        res.status(400).send(`Bad request ERROR ${err}`);
    }
    
})

module.exports = profileRouter;