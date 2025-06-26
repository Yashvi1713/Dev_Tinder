const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");


const UserSafeData = ["_id", "firstName", "lastName", "age", "skill","gender", "photoUrl"];

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
    const loggedInUser = req.user._id;
    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser, status: "accepted" },
          { fromUserId: loggedInUser, status: "accepted" },
        ],
      }).populate("fromUserId toUserId", UserSafeData);

      console.log(`Connection request: ${connectionRequests}`);

    const data = connectionRequests.map((row)=>{
        return row.fromUserId._id.toString() === loggedInUser.toString() ? row.toUserId : row.fromUserId;
    });
    console.log(`Connection Data: ${data}`);
    
    res
      .status(200)
      .json({ message: "All request Fetched Successfully!", data });
  } catch (err) {
    res.status(400).send(`Bad Request ERROR: ${err}`);
  }
});

module.exports = userRouter;
