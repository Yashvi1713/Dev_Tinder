const express = require("express"); // installing the required module
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const userRouter = require("./routes/user");

const app = express(); // initializing the app with express server
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
