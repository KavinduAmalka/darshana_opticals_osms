const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    Branch_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: [true, 'Branch ID is required'],
    },
    Item_Name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    Category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Men', 'Women', 'Kids', 'Sunglasses', 'Contact Lenses', 'Accessories'],
      trim: true,
    },
    Brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    Price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    Quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0,
    },
    Image: {
      type: String, // S3 URL for frame images
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
