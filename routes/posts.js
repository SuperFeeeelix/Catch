const router = require("express").Router();
const Post = require("../models/Post.js");


// create a post page

router.post("/", async (req,res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost);
    } catch(err) {
        return res.status(500).json(err)
    }
});

//update a post 
router.put("/:id", async (req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            if(post.userId === req.body.userId){
                await post.updateOne({$set:req.body})
                res.status(200).json("the post has been updated")
            } else {
                res.status(403).json("you can update only your posts");
            }  
        } catch (err) { 
            return res.status(500).json(err);
        } 
    });

// delete a post 
router.delete("/:id", async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json("the post has been deleted")
        } else{
            res.status(403).json("you can delete only your posts");
        }  

    }catch(err) { 
        return res.status(500).json(err);
    } 
});

// like a post
router.put("/:id/like", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push:{like:req.body.userId} });
            res.status(200).json("you have liked their post")
        } else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("disliked the post")
        }

    }catch (err) {
        return res.status(500).json(err);
    }
});

router.post('/:id/comment', async (req, res) => {
    try{
        const { content, postId } = req.body.Id;
        
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json("unable to find post")
        }
    } catch (err) {
        return res.status(500).json(err);
    }
}


//get a post 
router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch(err) {
        return res.status(500).json(err);
    }
})
// get timeline posts 


module.exports = router;