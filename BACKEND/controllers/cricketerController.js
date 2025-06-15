const mongoose = require('mongoose');
const Cricketer = require('../models/Cricketer');

// Create
exports.addCricketer = async (req, res) => {
  try {
    const { cricketerName, team, battingStyle } = req.body;
    const newCricketer = new Cricketer({ cricketerName, team, battingStyle });
    const savedCricketer = await newCricketer.save();
    res.status(201).json({
      message: 'Cricketer added successfully',
      id: savedCricketer._id,
      cricketer: savedCricketer,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to add cricketer' });
  }
};

// Read
exports.getCricketers = async (req, res) => {
  try {
    const cricketers = await Cricketer.find().lean();
    res.json(cricketers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cricketers' });
  }
};

// Update
exports.updateCricketer = async (req, res) => {
  try {
    const { id } = req.params;
    const { cricketerName, team, battingStyle } = req.body;

    const cricketer = await Cricketer.findById(id);
    if (!cricketer) {
      return res.status(404).json({ error: 'Cricketer not found' });
    }

    const updatedCricketer = await Cricketer.findByIdAndUpdate(
      id,
      { cricketerName, team, battingStyle },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Cricketer updated successfully',
      cricketer: updatedCricketer,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    res.status(500).json({ error: 'Failed to update cricketer' });
  }
};

// Delete
exports.deleteCricketer = async (req, res) => {
  try {
    const { id } = req.params;
    const cricketer = await Cricketer.findById(id);
    if (!cricketer) {
      return res.status(404).json({ error: 'Cricketer not found' });
    }

    await Cricketer.findByIdAndDelete(id);
    res.json({ message: 'Cricketer deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID' });
    }
    res.status(500).json({ error: 'Failed to delete cricketer' });
  }
};