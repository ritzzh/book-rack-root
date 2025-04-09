const Movie = require('../models/Movie');
const User = require('../models/User');
const Chomulation = require('../models/Chomulation');

// Fetch all movies that are to be watched
exports.getMoviesToWatch = async (req, res) => {
  try {
    const movies = await Movie.find({ watchStatus: 0 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies to watch' });
  }
};

// Fetch all movies that are watched
exports.getWatchedMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ watchStatus: 2 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch watched movies' });
  }
};

// Add a movie
exports.addMovie = async (req, res) => {
  try {
    const { movieInfo } = req.body;
    console.log(movieInfo)

    const user = await User.findOne({username: movieInfo.plannedBy});
    console.log(user)

    if(user) {
      const movie = new Movie({
        plannedBy: movieInfo.plannedBy,
        movieName: movieInfo.title,
        setOnDate: new Date(),
        setForDate: new Date(movieInfo.date),
        movieImage: movieInfo.image || "",
        personalNote: movieInfo.note,
        chomulation: user.chomulation
      });
      await movie.save();
      res.status(201).json(movie);
    } else {
      res.status(404).json({error: 'user not found'});
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to add movie' });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);

    // Update chomulation stats
    if (movie) {
      await Chomulation.findOneAndUpdate(
        { chomulationCode: movie.chomulationCode },
        { $inc: { totalMoviesToWatch: -1 } }
      );
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
