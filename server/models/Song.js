const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    queuedBy: {
      type: String,
      required: true,
    },
    setOnDate: {
      type: Date,
      required: true,
    },
    songName: {
      type: String,
      required: true,
    },
    songImage: {
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
    listenedStatus: {
      type: Number,
      default: 0, // 0 = Queued, 1 = Listening, 2 = Listened
    },
    listenedCount: {
      type: Number,
      default: 0,
    },
    listenedTogetherAt: {
      type: Date,
      default: null,
    },
    chomulationCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
