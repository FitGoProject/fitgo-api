const { Schema, model } = require('mongoose');

const classSchema = new Schema({
  gymId: {
    type: Schema.Types.ObjectId,
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

const Class = model('Class', classSchema);

module.exports = Class;
