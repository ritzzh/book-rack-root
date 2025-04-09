const mongoose = require('mongoose');

// 12 basic moods
const BASIC_MOODS = [
  'happy', 'sad', 'angry', 'fearful', 'surprised',
  'disgusted', 'calm', 'excited', 'bored',
  'confident', 'anxious', 'hopeful'
];

// Mood schema
const moodSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    month: { type: String, required:true},
    year: { type: String, required:true},
    moodHistory: [
      {
        username: { type: String, required: true },
        mood: { type: String, enum: BASIC_MOODS, required: true },
        description: { type: String, default: null },
        setOn: { type: Date, required: true },
        changedOn: {type: Date},
        duration: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true } // Automatically add `createdAt` and `updatedAt`
);

const Mood = mongoose.model('Mood', moodSchema);

module.exports = { Mood, BASIC_MOODS };
