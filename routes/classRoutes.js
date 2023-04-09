const express = require('express');
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, classController.createClass);
router.get('/', authMiddleware, classController.getClasses);
router.get('/:id', authMiddleware, classController.getClass);
router.put('/:id', authMiddleware, classController.updateClass);
router.delete('/:id', authMiddleware, classController.deleteClass);

module.exports = router;
