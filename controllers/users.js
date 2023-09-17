const { User, Thought } = require("../models");

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).populate('thoughts');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: "No User by that ID was found." });
      } 
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by ID
  updateUserById: async (req, res) => {
    try {
      const updatedFields = req.body;
      const user = await User.findByIdAndUpdate(req.params.userId, updatedFields, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User by that ID not found." });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete user and associated thoughts by ID
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: "User by that ID not found." });
      }

      for (const thought of user.thoughts) {
        await Thought.findByIdAndDelete(thought._id);
      }

      await User.findByIdAndDelete(userId);

      res.json({ message: `Deletion of user '${user.username}' and associated thoughts was successful.` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  addFriend: async (req, res) => {
    try {
      const { friendId } = req.params;
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $addToSet: { friends: friendId },
          $inc: { friendCount: 1 }
        },
        { runValidators: true, new: true }
      );
    
      if (!user) {
        return res.status(404).json({ message: "User by that ID not found." });
      }

      res.json({ message: `A new friend has been added for user '${user.username}'!` });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a friend from a user's friend list
  deleteFriend: async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId }, $inc: { friendCount: -1 } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User by that ID not found." });
      } 

      res.json({ message: `Deletion of friend '${friendId}' for user '${userId}' was successful.` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
