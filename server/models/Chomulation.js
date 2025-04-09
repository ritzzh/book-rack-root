const mongoose = require('mongoose');

const chomulationSchema = new mongoose.Schema(
  {
    initiator: {
      type: String,
      required: true,
    },
    reciprocator: {
      type: String,
      required: true,
    },
    chomulation: {
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
    totalMakeout: {
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
    memorableDates: {
      type: [Date],
      default: [],
    },
    movieRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    songRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Chomulation = mongoose.model('Chomulation', chomulationSchema);
module.exports = Chomulation;
