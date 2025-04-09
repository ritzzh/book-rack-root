const mongoose = require('mongoose');

const councilSchema = new mongoose.Schema(
  {
    friendOne: {
      type: String,
      required: true,
    },
    friendTwo: {
      type: String,
      required: true,
    },
    council: {
      type: String,
      required: true,
      unique: true,
    },
    totalTimeSpent: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    totalMoviesToWatch: {
      type: Number,
      default: 0,
    },
    totalMoviesWatched: {
      type: Number,
      default: 0,
    },
    mostLovedMovie: {
      type: String,
      default: null,
    },
    totalSongsToListen: {
      type: Number,
      default: 0,
    },
    totalSongsListened: {
      type: Number,
      default: 0,
    },
    mostLovedSong: {
      type: String,
      default: null,
    },
    totalChats: {
      type: Number,
      default: 0,
    },
    movieRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    songRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    onlineMeetRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OnlineMeet' }],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Council = mongoose.model('Council', councilSchema);
module.exports = Council;
