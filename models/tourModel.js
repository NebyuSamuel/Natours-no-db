// Import mongoose
const mongoose = require("mongoose");

// Create a schema for tour collection
const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name must be included"],
    unique: true,
  },
  rate: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [true, "A price must be included"],
  },
});

// Create a model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
