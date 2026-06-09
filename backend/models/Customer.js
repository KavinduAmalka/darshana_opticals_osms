const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    Email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    Password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never return password in queries by default
    },
    Address: {
      type: String,
      trim: true,
    },
    Phone_number: {
      type: String,
      trim: true,
    },
    Role: {
      type: String,
      default: 'customer',
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
customerSchema.pre('save', async function () {
  if (!this.isModified('Password')) return;
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

// Compare entered password with hashed password
customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = mongoose.model('Customer', customerSchema);
