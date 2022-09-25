const router = require('express').Router();
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const auth = require('../helper/helper');

require('dotenv').config();

router.post('/register', async (req, res) => {
    try {
        let isPresent = await User.findOne({ email: req.body.email });
        if (isPresent) {
            res.json({ status: 400, message: "User Already Exisr" })
        } else {
            let user = await new User(req.body).save();
            let token = await JWT.sign({
                userId: user._id
            }, process.env.SECRET)
            res.json({ status: 200, message: "Registred Success!", data: user, token: token });
        }
    } catch (error) {
        if (error.code == 11000)
            res.json({ status: 400, message: "User Already Exits!", error: error });
        else
            res.json({ status: 400, message: "Error!", error: error });
    }
})

router.post('/login',async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({ email: email });
        if (user.password === password) {
            let token = await JWT.sign({
                userId: user._id
            }, process.env.SECRET)
            res.json({ status: 200, message: "Login Success!", data: user, token: token });
        }
        else {
            res.json({ status: 400, message: "Incorrect Password!", data: {} });
        }
    } catch (error) {
        res.json({ status: 400, message: "User does not exist!", error: error });
    }
})

router.get('/getOne', async(req, res)=>{
    try {
        let user = await User.findOne({_id:req.query.userId});
        res.json({ status: 200, message: "User Found Success!", data: user });
    } catch (error) {
            res.json({ status: 400, message: "Error!", error: error });
    }
})
module.exports = router;