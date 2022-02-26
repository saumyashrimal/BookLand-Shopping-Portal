const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let usercollection = require("../models/usermodel");
let sellercollection = require("../models/sellermodel")


const login = async (req,res,next) => {

    try{
        let credentials = req.body;

        let collectionObj = credentials.type === "user" ? usercollection : sellercollection;

        //verify email
        let user = await collectionObj.findOne({email : credentials.email})

        // console.log("user = ",user)
        // console.log("credentials = ",credentials)

        //if user does not exist 
        if(user === null){
            res.send({message:"Invalid Username"})
        }
        //if user exist
        else{
            //compare password
            let result = await bcryptjs.compare(credentials.password , user.password);
            //check the credentials type is user and seller
                //if password not matched 
                if(result === false){
                    res.send({message : "Invlaid password"});
                }

                //if password matched
                else{
                    //create a token and send it as a response
                    let token = await jwt.sign({email:user.email},process.env.SECRET , {expiresIn:600})

                    //deleting the password
                    delete user.password;
                    res.send({message : "login-success" , token : token , username:user.username ,userObj:user});
                }

        }
    }

    catch(err) {
        res.send({message : err.message})
    }
}

module.exports = login;