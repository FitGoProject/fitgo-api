const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  
module.exports = mongoose.model('Option', optionSchema);
