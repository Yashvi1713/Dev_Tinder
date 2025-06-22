const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtAuth = async (req, res, next) => {
  try {
    // Read token from req cookies
    const { token } = req.cookies;
    console.log(`Token inside jwtAuth ${token}`);

    if(!token){
        throw new Error("Token is not valid!!");
    }

    // Validate token
    const decodedObj = await jwt.verify(token, "Yashvi@123");
    const { _id } = decodedObj;
    const user = await User.findById(_id); // await bcz promise function che
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`Bad Request ERROR ${err.message}`);
  }
};

module.exports = jwtAuth ;
