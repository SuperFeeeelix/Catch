const router = require('express').Router();
const User = require("../models/User");


// Update user
router.put("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
           
            const user = await User.findByIdAndUpdate(req.params.Id, {
                $set: req.body
            });
            res.status(200).json("User's account has been updated")
        } catch(err) {
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You can't update only your account!!!");
    }
}) 

// Delete user
router.delete("/:id", async (req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            await User.findByIdAndDelete(req.params.Id);
            res.status(200).json("User's account has been deleted successfully")
        } catch(err) {
            return res.status(500).json(err);
        }

    } else{
        return res.status(403).json("You can delete only your account!!!");
    }
}) 

// Get a user
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
 
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch(err) {
        return res.status(500).json("You found the wrong user. Please try again.");
    }
})

// Follow a user 
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else{
                res.status(403).json("You already follow this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't follow yourself buddy");
    }
})

// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else{
                res.status(403).json("You don't follow this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't unfollow yourself buddy");
    }
})

module.exports = router;
