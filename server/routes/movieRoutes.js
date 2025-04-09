const express = require('express');
const {
  getMoviesToWatch,
  getWatchedMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const router = express.Router();

router.get('/to-watch', getMoviesToWatch);
router.get('/watched', getWatchedMovies);
router.post('/add', addMovie);
router.put('/update/:id', updateMovie);
router.delete('/delete/:id', deleteMovie);

module.exports = router;
