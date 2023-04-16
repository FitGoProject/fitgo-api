const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const subscriptionController = require('../controllers/subscriptionController');

router.use(authMiddleware);

// Subscription routes
router.post('/', subscriptionController.createSubscription);
router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.put('/:id', subscriptionController.updateSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);



module.exports = router;
