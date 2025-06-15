const express = require('express');
const router = express.Router();
const {
  addCricketer,
  getCricketers,
  updateCricketer,
  deleteCricketer
} = require('../controllers/cricketerController');

router.post('/add-cricketer', addCricketer);
router.get('/get-cricketers', getCricketers);
router.put('/update-cricketer/:id', updateCricketer);
router.delete('/delete-cricketer/:id', deleteCricketer);

module.exports = router;
