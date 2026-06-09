const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema(
  {
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
    },
    Inquiry_Type: {
      type: String,
      required: [true, 'Inquiry type is required'],
      enum: [
        'Frame Recommendations',
        'Track my order',
        'Opening hours',
        'Our services',
        'Location and contact',
      ],
      trim: true,
    },
    Response_Status: {
      type: String,
      enum: ['pending', 'responded', 'closed'],
      default: 'pending',
    },
    Messages: [
      {
        sender: {
          type: String,
          enum: ['customer', 'bot'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Chatbot', chatbotSchema);
