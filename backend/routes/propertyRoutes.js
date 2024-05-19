const express = require('express');
const {
  postProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  likeProperty,
  interestedInProperty,
} = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getProperties)
  .post(authMiddleware, postProperty);

router.route('/:id')
  .get(getPropertyById)
  .put(authMiddleware, updateProperty)
  .delete(authMiddleware, deleteProperty);

router.put('/:id/like', authMiddleware, likeProperty);
router.post('/:id/interested', authMiddleware, interestedInProperty);

module.exports = router;
