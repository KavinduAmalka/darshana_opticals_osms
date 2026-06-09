const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema(
  {
    Address: {
      type: String,
      required: [true, 'Branch address is required'],
      trim: true,
    },
    Contact_Number: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Branch', branchSchema);
