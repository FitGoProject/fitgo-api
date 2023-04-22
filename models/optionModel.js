const { Schema, model } = require('mongoose');

const optionSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  });
  
module.exports = model('Option', optionSchema);
