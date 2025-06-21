const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minLength: 4, maxLength: 50 },
    lastName: String,
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`Invalid Email ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Password not strong ${value}`);
        }
      },
    },
    age: Number,
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({_id : user._id}, "Yashvi@123");
  return token;
}

userSchema.methods.securePassword = async function(passwordInputByUser){
  const hashPassword = this.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, hashPassword);
  return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
