const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
      }
      res.status(201).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete thought by ID
  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update thought by ID
  updateThoughtById: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedThought) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction to a thought
  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: "No 'Thought' by that ID was found.",
        });
      }
      res.json({ message: "A new reaction has been added!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: "No 'Thought' was found.",
        });
      } else if (thought.reactions.length === 0) {
        return res.status(404).json({
          message: "No 'Reaction' by that ID was found.",
        });
      }
      res.json({
        message: "Deletion of reaction was successful.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
