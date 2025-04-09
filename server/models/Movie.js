const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    plannedBy: {
      type: String,
      required: true,
    },
    setOnDate: {
      type: Date,
      required: true,
    },
    setForDate: {
      type: Date,
      required: true,
    },
    movieName: {
      type: String,
      required: true,
    },
    movieImage: {
      type: String,
      default: null,
    },
    personalNote: {
      type: String,
      default: null,
    },
    personalReview: {
      type: String,
      default: null,
    },
    personalRating: {
      type: Number,
      default: 0
    },
    watchStatus: {
      type: Number,
      default: 0, // 0 = Planned, 1 = Watching, 2 = Watched
    },
    watchCount: {
      type: Number,
      default: 0,
    },
    watchedTogetherOn: {
      type: Date,
      default: null,
    },
    chomulation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
