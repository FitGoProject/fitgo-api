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

module.exports = router;
