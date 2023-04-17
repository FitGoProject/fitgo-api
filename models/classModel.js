const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
