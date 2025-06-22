const validator = require('validator');

const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName ){
        throw new Error ("Name is not present");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email not vaid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password not valid");
    }

};


const validateEditProfileData = (req) => {
    const allowedEditfields = ["firstName", "lastName", "emailId", "photoUrl", "gender", "age", "about", "skills"];
    // every array method is used bcz it returns a boolean value and foreach does returns any value. Also includes returns a boolean as well so it send to every method which recognizes it and return value to variable also it will stop iterating once it gets false bool value from the loop
    const isEditAllowed = Object.keys(req.body).every((fields)=>{
        return allowedEditfields.includes(fields);
    });
    return isEditAllowed;
}

module.exports = {validateSignUpData, validateEditProfileData};