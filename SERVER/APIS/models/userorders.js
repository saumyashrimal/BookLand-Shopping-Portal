const mongoose = require("mongoose");

const userOrdersSchema = new mongoose.Schema({
    useremail:{
        type:String,
        required: true,
        trim:true
    },
    
    selleremail:{
        type:String,
        required: true,
        trim:true
    },

    bookmodel : {
        type:String,
        required: true,
        trim:true
    },

    qty:{
        type:Number,
        required:true
    },
    
    status:{
        type:String,
        required:true,
        trim:true,
        default:"Pending"
    },

    address:{
        type:String,
        required:true,
        trim:true
    },

    price:{
        type:Number,
        required:true,
    },

    bookname:{
        type:String,
        required:true,
        trim:true
    },

    paymentmethod:{
        type:String,
        required:true,
        trim:true
    }


},{timestamps:true})


module.exports = mongoose.model("Userorderscollection",userOrdersSchema);