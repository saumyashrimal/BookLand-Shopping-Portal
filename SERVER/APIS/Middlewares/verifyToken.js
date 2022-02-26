const jwt = require("jsonwebtoken");

const CheckToken = (req,res,next) => {
    try{
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,'keyabcd')
        next();
    }
    catch(err){
        res.send({message:err.message})
    }
}

module.exports = CheckToken;