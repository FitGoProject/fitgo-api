const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gymId: {
    type: Schema.Types.ObjectId,
    ref: 'Gym',
    required: true,
  },
  optionId: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
