const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
    },
    Order_Date: {
      type: Date,
      default: Date.now,
    },
    Order_amount: {
      type: Number,
      required: [true, 'Order amount is required'],
      min: [0, 'Order amount cannot be negative'],
    },
    Status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
