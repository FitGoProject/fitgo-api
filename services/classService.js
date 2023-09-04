const Class = require('../models/classModel');

exports.createClass = async (classData) => {
  try {
    const newClass = new Class(classData);
    await newClass.save();
    return newClass;
  } catch (error) {
    throw error;
  }
};

exports.getClass = async (classId) => {
  try {
    const foundClass = await Class.findById(classId);
    return foundClass;
  } catch (error) {
    throw error;
  }
};

exports.getClasses = async ({ page = 1, limit = 10 } = {}) => {
  try {
    page = parseInt(page);
    limit = parseInt(limit);
    
    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      throw new Error('Invalid page or limit value');
    }
  
    const totalClasses = await Class.countDocuments();
    const totalPages = Math.ceil(totalClasses / limit);
  
    const classes = await Class.find()
      .skip((page - 1) * limit)
      .limit(limit);
    
    return {
      totalClasses,
      totalPages,
      currentPage: page,
      classes
    };
  } catch (error) {
    throw error;
  }
};

exports.updateClass = async (classId, classData) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(classId, classData, { new: true });
    return updatedClass;
  } catch (error) {
    throw error;
  }
};

exports.deleteClass = async (classId) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(classId);
    return deletedClass;
  } catch (error) {
    throw error;
  }
};
