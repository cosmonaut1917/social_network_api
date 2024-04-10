
const router = require('express').Router();
const {getThoughts,createThought,deleteThought}= require('../../controllers/thought-controller');
router.route('/').get(getThoughts).post(createThought);
// router.route('/:id').get(getThoughtById);
router.route('/:thoughtId').delete(deleteThought);
// router.route('/:thoughtId/reactions').put(addReaction);
// router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;