const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    booksmodel:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    bookname:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:30
    },
    bookauthor:{
        type:String,
        required:true,
        min:2,
        max:30
    },
    bookprice:{
        type:Number,
        required:true,
    },
    bookdescription:{
        type:String,
    },
    booklevel:{
        type:String
    },
    parentcategory:{
        type:String,
        required:true
    },
    booksPhotos:{
        type:String,
        required:true
    },
    selleremail:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    availableqty:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        default:0
    }

},{timestamps:true})


module.exports = mongoose.model("Bookscollection",booksSchema);

