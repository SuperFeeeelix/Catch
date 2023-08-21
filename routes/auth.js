const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res) => {
    try{
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        });
         // save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.error("couldn't help but notice but this post route in the register doesn't work homeboy");
    }
   
});

//Login
router.post("/login", async (req,res) => {

    try{
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user was not found dude");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("users password was not valid");

    res.status(200).json(user);

    } catch(err) {
        console.error("this was the wrong request in the login post request");
    }
})

module.exports = router;  