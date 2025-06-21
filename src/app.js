const express = require("express"); // installing the required module
const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation");
const cookie = require("cookie-parser");
const userAuth = require("./middleware/auth");

const app = express(); // initializing the app with express server

app.use(express.json()); // parse each and every request body recieved by the server
app.use(cookie());


// Signup API 
app.post("/signup", async (req, res) => {
  try {
    // Validating the user data
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

app.post('/login', async (req, res)=>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid Credentials!")
        };

        const isPasswordValid = user.securePassword(password);
        
        if(isPasswordValid){
          const token = await user.getJWT();
          // Add token to cookie and send response back to user
          res.cookie("token",token);
          res.send("LoggedIn user found successfully!")
        }else{
          throw new Error("Credential Invalid!");
        }
        console.log(`User inside login ${user}`);
    }catch (err) {
    res.status(400).send("Error:" + err.message);
  };
});

app.get("/profile",userAuth, async (req, res)=>{
    try{
      const user = req.user;
      res.send(user);
    }catch(err){
      res.status(400).send("Error:" + err.message);
    };

});

// For changing specific part of the user profile
app.patch("/user", userAuth, async (req, res) => {
  const user = req.user
  const userId = user._id;
  console.log(`User id inside patch ${userId}`);
  
  const data = req.body;
  console.log(`data inside patch ${data}`);

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    if(!user){
      throw new Error("No user found!!")
    }
    console.log(`user inside patch request ${user}`);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send(`somehting went wrong ${err}`);
  }
});

app.post("/sendConnectionRequest",userAuth ,async(req,res)=>{
  // logic for send connection request
  const user = req.user;
  console.log(`${user.firstName} sends Connection Request`);
  res.send(`${user.firstName} sends Connection Request`);
  
});

// Building connection with DB first and after that connecting with server
connectDB()
  .then(() => {
    console.log("DB connected successfully!");
    app.listen(3000, () => {
      console.log("Listening at port 3000");
    });
  })
  .catch((err) => {
    `Error Occured ${err}`;
  });
