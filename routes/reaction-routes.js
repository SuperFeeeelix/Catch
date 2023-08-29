const router = require('express').Router();
const Reaction = require('../models/Reaction');

// Create a new reaction
router.post('/', async (req, res) => {
    try {
        const newReaction = new Reaction(req.body);
        const savedReaction = await newReaction.save();
        res.status(201).json(savedReaction);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a reaction by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedReaction = await Reaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedReaction);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a reaction by ID
router.delete('/:id', async (req, res) => {
    try {
        await Reaction.findByIdAndDelete(req.params.id);
        res.status(204).json('Reaction deleted successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a reaction by ID
router.get('/:id', async (req, res) => {
    try {
        const reaction = await Reaction.findById(req.params.id);
        res.status(200).json(reaction);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
