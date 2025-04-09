const express = require('express');
const {
  getPlannedMeets,
  getAttendedMeets,
  addMeet,
  updateMeet,
  deleteMeet,
} = require('../controllers/onlineMeetController');
const router = express.Router();

router.get('/planned', getPlannedMeets);
router.get('/attended', getAttendedMeets);
router.post('/add', addMeet);
router.put('/update/:id', updateMeet);
router.delete('/delete/:id', deleteMeet);

module.exports = router;
