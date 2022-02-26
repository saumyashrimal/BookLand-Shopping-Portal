const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
        min:10,
        max:10
    },
    address:{
        type:Array,
        default:[]
    }

},{timestamps:true})


module.exports = mongoose.model("Usercollection",userSchema);