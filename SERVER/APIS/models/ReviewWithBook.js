const mongoose = require("mongoose");

const bookreviewSchema = new mongoose.Schema({
    book:{
        type:String,
        required: true,
        trim:true,
        min:3,
        max:10
    },
    reviews:{
        type:Array,
        required: true,
    }

},{timestamps:true})


module.exports = mongoose.model("Bookreviewcollection",bookreviewSchema);