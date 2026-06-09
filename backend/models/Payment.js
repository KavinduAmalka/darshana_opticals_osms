const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    Order_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: [true, 'Order ID is required'],
    },
    Amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
      min: [0, 'Amount cannot be negative'],
    },
    Transaction_date: {
      type: Date,
      default: Date.now,
    },
    Payment_method: {
      type: String,
      enum: ['card', 'cash', 'payhere'],
      default: 'card',
    },
    Payment_status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
