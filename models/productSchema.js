const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    published :{
        type : Boolean,
        default : false,
        required:false
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required : true,
    },
    rating:{
        type : Number,
        required:false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
{
    timestamps:true, //created createAt, updateAt
});

const Product = mongoose.model("Product",productSchema);

module.exports = Product


