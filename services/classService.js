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

exports.getClasses = async () => {
  try {
    const classes = await Class.find();
    return classes;
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
