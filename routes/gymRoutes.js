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
// Options
router.post('/:id/options', gymController.createOption);
router.get('/:id/options', gymController.getOptions);
router.get('/:id/options/:optionId', gymController.getOption);
router.put('/:id/options/:optionId', gymController.updateOption);
router.delete('/:id/options/:optionId', gymController.deleteOption);

module.exports = router;
