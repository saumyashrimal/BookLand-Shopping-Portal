const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    businessname:{
        type:String,
        required:true,
        min:6,
        max:20
    },
    username:{
        type:String,
        required: true,
        trim:true,
        min:3,
        max:10
    },
    email:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required: true,
        min:6
    },
    contactno:{
        type:String,
        required:true,
        min:10,
        max:10
    }

},{timestamps:true})


module.exports = mongoose.model("Sellerscollection",sellerSchema);