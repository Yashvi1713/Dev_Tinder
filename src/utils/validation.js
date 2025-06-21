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

module.exports = validateSignUpData;