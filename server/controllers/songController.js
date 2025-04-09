const Song = require('../models/Song');
const Chomulation = require('../models/Chomulation');

// Fetch all queued songs
exports.getQueuedSongs = async (req, res) => {
  try {
    const songs = await Song.find({ listenedStatus: 0 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queued songs' });
  }
};

// Fetch all listened songs
exports.getListenedSongs = async (req, res) => {
  try {
    const songs = await Song.find({ listenedStatus: 2 });
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listened songs' });
  }
};

// Add a song
exports.addSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();

    // Update chomulation stats
    const { chomulationCode } = req.body;
    await Chomulation.findOneAndUpdate(
      { chomulationCode },
      { $inc: { totalSongsToListen: 1 } }
    );

    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add song' });
  }
};

// Update a song
exports.updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update song' });
  }
};

// Delete a song
exports.deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findByIdAndDelete(id);

    // Update chomulation stats
    if (song) {
      await Chomulation.findOneAndUpdate(
        { chomulationCode: song.chomulationCode },
        { $inc: { totalSongsToListen: -1 } }
      );
    }

    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete song' });
  }
};
