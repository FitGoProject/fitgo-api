const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  gymId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gym',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
