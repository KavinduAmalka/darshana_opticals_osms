const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: [true, 'Customer ID is required'],
    },
    Staff_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Staff/Doctor ID is required'],
    },
    Date_Time: {
      type: Date,
      required: [true, 'Appointment date and time is required'],
    },
    Status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
