const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', gymController.createGym);
router.get('/', gymController.getAllGyms);
router.get('/:id', gymController.getGymById);
router.put('/:id', gymController.updateGym);
router.delete('/:id', gymController.deleteGym);
// Plans
router.post('/:id/plans', gymController.createPlan);
router.get('/:id/plans', gymController.getPlans);
router.get('/:id/plans/:planId', gymController.getPlan);
router.put('/:id/plans/:planId', gymController.updatePlan);
router.delete('/:id/plans/:planId', gymController.deletePlan);

module.exports = router;
