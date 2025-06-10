const mongoose = require('mongoose');

const url = "mongodb+srv://yashvishukla:Datathon@projects.gm5ku.mongodb.net/DevTinder";

const connectDB = async ()=> {
    await mongoose.connect(url)
};

module.exports = connectDB;