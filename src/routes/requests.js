const express = require("express");
const userAuth = require("../middleware/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth ,async(req,res)=>{
  // logic for send connection request
  const user = req.user;
  console.log(`${user.firstName} sends Connection Request`);
  res.send(`${user.firstName} sends Connection Request`);
  
});

module.exports = requestRouter;