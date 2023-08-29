const router = require("express").Router();
const Thought = require("../models/Thought.js");

router.post("/", async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();
        res.status(200).json(savedThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        await thought.updateOne({ $set: req.body });
        res.status(200).json("The thought has been updated");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        await thought.deleteOne();
        res.status(200).json("The thought has been deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id/like", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought.likes.includes(req.body.userId)) {
            await thought.updateOne({ $push: { like: req.body.userId } });
            res.status(200).json("You have liked the thought");
        } else {
            await thought.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("You have disliked the thought");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id/comment', async (req, res) => {
    try {
        const { content, thoughtId } = req.body;
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            return res.status(404).json("Unable to find thought");
        }
        
        thought.comments.push({ content });

        const updatedThought = await thought.save();
        
        res.status(200).json(updatedThought);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
