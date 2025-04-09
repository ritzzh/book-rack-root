const mongoose = require('mongoose');

const onlineMeetSchema = new mongoose.Schema(
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
    meetLink: {
      type: String,
      required: true,
    },
    personalNote: {
      type: String,
      default: null,
    },
    attendStatus: {
      type: Number,
      default: 0, // 0 = Planned, 1 = Attended, 2 = Missed
    },
    meetDuration: {
      type: Number, // Duration in minutes
      default: 0,
    },
    chomulationCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OnlineMeet = mongoose.model('OnlineMeet', onlineMeetSchema);
module.exports = OnlineMeet;
