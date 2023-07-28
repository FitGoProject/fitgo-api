const { Schema, model } = require('mongoose');

const optionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    months: { type: Number },
    price: { type: Number },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    weekly: { type: Number },
    monthly: { type: Number },
  });
  
module.exports = model('Option', optionSchema);
