const router = require('express').Router();

 // Import the functions from friendController
const { 
    addFriend, 
    removeFriend 
} = require('../controllers/friendsController');

// POST ADD A NEW FRIEND
router.post('/:userId/friends/:friendId', addFriend); 

// DELETE A FRIEND
router.delete('/:userId/friends/:friendId', removeFriend); 

module.exports = router;