const { User } = require('../models/User');

const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error adding friend.' });
  }
};

const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error removing friend.' });
  }
};

module.exports = {
  addFriend,
  removeFriend
};
