const express = require("express");
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      // logic for send connection request
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      // Validating the status type 
      const allowedStatus = ["interested", "ignored"]
      if(!allowedStatus.includes(status)){
          return res.status(400).json({message : `Invalid Status Type: ${status}`});
        }

      // Validating if the user exists in the db of the user & making sure request is not being saved for non-registered user
      const isUserExists = await User.findById(toUserId);
      if(!isUserExists){
        return res.status(404).send({message: "User doesn't exists!"});
      }

      // Validating if the connection req already exists and also one person is not sending the req back to the person who has already send the req
      const existingRequest = await ConnectionRequest.findOne({
        $or:[{fromUserId,toUserId}, {fromUserId:toUserId, toUserId:fromUserId}]
      });
      
      if(existingRequest){
        return res.status(400).send({message : "Connection Request Already Exists!"});
      }
      
      const userConnectionRequest = new ConnectionRequest({fromUserId, toUserId, status});
    
      const savedRequest = await userConnectionRequest.save();
      console.log("Saved Request:", savedRequest);

      res.json({
        message : `${req.user.firstName}'s connection request send successfully!`,
        body : {savedRequest}
      });
    } catch (err) {
      res.status(400).send(`Bad Request ERROR : ${err}`);
    }
  }
);

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  // logic for send connection request
  const user = req.user;
  console.log(`${user.firstName} sends Connection Request`);
  res.send(`${user.firstName} sends Connection Request`);
});

module.exports = requestRouter;
