const express = require('express');
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require('bcrypt');

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    // Validating user data and performing data sanitization
    validateSignUpData(req);

    // Encrypt password
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);

    req.body.password = hashPassword;

    // creating instance of user model
    const user = new User(req.body);
    await user.save();
    res.send("User created successfully!");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

authRouter.post('/login', async (req, res)=>{
    try{
        const {emailId, password} = req.body;
        console.log(`Password inside login diya ${password}`);
        
        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid Credentials!")
        };

        const isPasswordValid = await user.securePassword(password);
        console.log(`isvalidpassword result ${isPasswordValid}`);
        
        
        if(isPasswordValid){
          const token = await user.getJWT();

          // Add token to cookie and send response back to user
          res.cookie("token",token);
          res.send("LoggedIn user found successfully!")
        }else{
          res.clearCookie("token");
          throw new Error("Credential Invalid!");
        }
        console.log(`User inside login ${user}`);
    }catch (err) {
    res.status(400).send("Error:" + err.message);
  };
});

authRouter.post('/logout', async(req, res)=>{
    res.cookie("token", null , {expires : new Date(Date.now())}).send("Logout Successfully!!");
})

module.exports = authRouter;