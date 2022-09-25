const jwt = require('jsonwebtoken');
const User =  require('../models/user');

module.exports = async(req, res, next) =>{
    let token = req.headers.authorization.split(' ')[1];
    // console.log(token); 
    if(!token){
        res.send({status:400, message:"Please provide Token"});
    }else{
        jwt.verify(token, process.env.SECRET, (err, result)=>{
            if(err){
                res.send({status:400, message:"Invalid TOken"});
            }else{
            // userId = result.userId;
            next();
            }
        })
    }
}