const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
        unique : true
    },
    password :{
        type:String,
        required : true,

    },
    phone :{
        type:String,
        required:true,
        unique : true
    },
    address :{
        type:String,
        required:true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: false
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
{
    timestamps:true
}

);

userSchema.pre('save', function(next) {
    if (!this.createdBy) {
        this.createdBy = this._id; 
    }
    if (!this.updatedBy) {
        this.updatedBy = this._id; 
    }
    next();
});

const User = mongoose.model("User",userSchema);


module.exports = User;