const router = require('express').Router();


const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThoughtbyId,
  deleteThought,
} = require('../controllers/thoughtController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getThoughtsById).put(updateThoughtbyId).delete(deleteThought);




module.exports = router;