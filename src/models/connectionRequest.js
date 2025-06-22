const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
    {
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required: true,
        enum : {
            values : ["ignored", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps: true,
}
);

connectionRequestSchema.index({fromUserId : 1, toUserId : 1})

// Validaiting if the user is not sending request to itself using the schema level middleware function pre
// Also declaring function at the schema level always use named function and avoid arrow functions bcz in that this keyword doesn't work and we can use this keyword to address the existing instance of the schema 
connectionRequestSchema.pre("save", function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("can't send Request to yourself!");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;