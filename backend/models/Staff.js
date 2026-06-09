const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const staffSchema = new mongoose.Schema(
  {
    Branch_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
      required: [true, 'Branch ID is required'],
    },
    Name: {
      type: String,
      required: [true, 'Staff name is required'],
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
      select: false,
    },
    Phone_number: {
      type: String,
      trim: true,
    },
    Address: {
      type: String,
      trim: true,
    },
    Role: {
      type: String,
      enum: ['optometrist', 'inventory_manager', 'branch_manager'],
      required: [true, 'Staff role is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
staffSchema.pre('save', async function () {
  if (!this.isModified('Password')) return;
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
});

// Compare entered password with hashed password
staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

module.exports = mongoose.model('Staff', staffSchema);
