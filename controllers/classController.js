const classService = require('../services/classService');

exports.createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const foundClass = await classService.getClass(classId);
    if (!foundClass) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.status(200).json(foundClass);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ message: 'Invalid page or limit value' });
    }

    const classes = await classService.getClasses({ page, limit });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const updatedClass = await classService.updateClass(classId, req.body);
    if (!updatedClass) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.status(200).json(updatedClass);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classId = req.params.id;
    const deletedClass = await classService.deleteClass(classId);
    if (!deletedClass) {
      res.status(404).json({ message: 'Class not found' });
    } else {
      res.status(200).json({ message: 'Class successfully deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
