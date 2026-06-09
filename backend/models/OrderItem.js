const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    Order_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order ID is required'],
    },
    Item_name: {
      type: String,
      required: [true, 'Item name is required'],
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
      min: [1, 'Quantity must be at least 1'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);
