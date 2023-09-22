const express = require('express');
const router = express.Router();




const {
  getAllUsers,
  getUsersById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/usersController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser);

module.exports = router;