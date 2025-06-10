const express = require("express"); // installing the required module
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express(); // initializing the app with express server

app.post("/signup", async (req, res)=>{
    // creating instance of user model
    const user = new User({
        firstName : "Virat",
        lastName : "Kholi",
        emailId : "virat@gmail.com",
        password : "virat",
        age : 33,
        gender : "Male"
    });

    try{
        await user.save();
        res.send("User created successfully!");
    }catch(err){
        res.status(400).send(`Error saving the user: ${err.message}`)
    }
    
});

connectDB().then(()=>{
    console.log("DB connected successfully!");
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    });
}).catch((err)=>{`Error Occured ${err}`});

