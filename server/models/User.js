const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    // User
    username: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number, min: 0, default: null },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer not to say'],
      default: 'prefer not to say',
    },
    location: { type: String, default: null },
    isAdmin: { type: Boolean, default: false },
    profileImage: { type: String, default: null },
    currentFavSong: { type: String, default: null },
    currentFavMovie: { type: String, default: null },
    creationTime: { type: Date, default: Date.now },
    
    // Chomulation
    partner: { type: String, lowercase: true, default: null },
    sentPartnerRequest : {type: Array, default: []},
    receivedPartnerRequest : {type: Array, default: []},
    chomulation: { type: String, default: null },

    // Council
    friend: { type: String, lowercase: true, default: null },
    friendRequest : {type: Array, default: []},
    council: { type: String, default: null },

  },
  { timestamps: true }
);

// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
