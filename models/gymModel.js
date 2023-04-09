const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  placeId: { type: String, required: true },
});

const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

const gymSchema = new mongoose.Schema({
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  location: { type: locationSchema, required: true },
  members: [memberSchema],
  options: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      months: { type: Number },
      price: { type: Number },
      classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
      weekly: { type: Number },
      monthly: { type: Number },
    },
  ],
});

module.exports = mongoose.model('Gym', gymSchema);
