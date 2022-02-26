const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim:true,
        index:true,
        unique:true
    },
    
    books:{
        type:Array,
        required:true
    }

},{timestamps:true})


module.exports = mongoose.model("Usercartcollection",userCartSchema);