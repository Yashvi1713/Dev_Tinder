const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const user = require("../models/user");


const UserSafeData = "firstName lastName age skill gender photoUrl";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const data = await connectionRequest
      .find({ toUserId: loggedInUser, status: "interested" })
      .populate("fromUserId", UserSafeData);
    res
      .status(200)
      .json({ message: "Fetched All Request Successfully!!", data });
  } catch (err) {
    res.status(400).send(`Bad Request ERROR: ${err}`);
  }
});

userRouter.get("/user/requests/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      }).populate("fromUserId", UserSafeData).populate("toUserId", UserSafeData); // populate method replaces the referenced objectId with the actual document from referenced model(i.e. User model)

      console.log(`Connection request: ${connectionRequests}`);

    const data = connectionRequests.map((row)=>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });
    console.log(`Data: ${data}`);

    res
      .status(200)
      .json({ data});
  } catch (err) {
    res.status(400).send(`Bad Request ERROR: ${err}`);
  }
});

userRouter.get("/feed", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1)*limit;

        // Finding all the users whom I have send i.e fromUserId and received i.e.toUserId
        const connectionRequests = await connectionRequest.find({
          $or : [{toUserId: loggedInUser}, {fromUserId:loggedInUser}]
        });
        
        // here I'm making a set which is like array which doesn't allow duplicate values within
        const hideUserConnection = new Set();
        //adding all the request found in connectionRequests
        connectionRequests.forEach((req)=>{
          hideUserConnection.add(req.fromUserId);
          hideUserConnection.add(req.toUserId);
        });
        console.log(`Hide user's ${hideUserConnection}`);
        
        // finding all the users which are not present in hideUserConnection and also not allowing the loggedInUser to see it self as well
        const Users = await user.find({
          $and : [
          {_id : {$nin: Array.from(hideUserConnection)}}, {_id : {$ne : loggedInUser}}]
        }).select(UserSafeData).skip(skip).limit(limit); // select method is use to specify which document fields to include or exclude from the result set when querying the database
        
        res.send(Users);
    }catch(err){
        res.status(400).send(`Bad Request ERROR: ${err}`);
    }
})

module.exports = userRouter;
