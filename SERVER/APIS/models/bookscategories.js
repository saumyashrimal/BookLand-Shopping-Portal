const mongoose = require('mongoose');

const bookscategoriesSchema = new mongoose.Schema({
    category:{
        type:String,
        unique:true,
        index:true
    }
})


module.exports = mongoose.model("Bookcategoriescollection",bookscategoriesSchema);