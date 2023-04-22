const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  placeId: { type: String, required: true },
});

const memberSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

const gymSchema = new Schema({
  admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  location: { type: locationSchema, required: true },
  members: [memberSchema],
  options: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      months: { type: Number },
      price: { type: Number },
      classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
      weekly: { type: Number },
      monthly: { type: Number },
    },
  ],
});

module.exports = model('Gym', gymSchema);
