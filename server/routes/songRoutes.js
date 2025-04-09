const express = require('express');
const {
  getQueuedSongs,
  getListenedSongs,
  addSong,
  updateSong,
  deleteSong,
} = require('../controllers/songController');
const router = express.Router();

router.get('/queued', getQueuedSongs);
router.get('/listened', getListenedSongs);
router.post('/add', addSong);
router.put('/update/:id', updateSong);
router.delete('/delete/:id', deleteSong);

module.exports = router;
