const mongoose = require('mongoose');

const cricketerSchema = new mongoose.Schema(
  {
    cricketerName: {
      type: String,
      required: [true, 'Cricketer name is required'],
      trim: true,
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    team: {
      type: String,
      required: [true, 'Team is required'],
      trim: true,
      maxLength: [50, 'Team cannot exceed 50 characters'],
    },
    battingStyle: {
      type: String,
      required: [true, 'Batting style is required'],
      trim: true,
      maxLength: [50, 'Batting style cannot exceed 50 characters'],
    },
  },
  { timestamps: true }
);

// Index for faster queries
cricketerSchema.index({ cricketerName: 1 });

module.exports = mongoose.model('Cricketer', cricketerSchema);