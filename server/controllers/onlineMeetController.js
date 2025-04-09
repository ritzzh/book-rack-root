const OnlineMeet = require('../models/OnlineMeet');
const Chomulation = require('../models/Chomulation');

// Fetch all planned meets
exports.getPlannedMeets = async (req, res) => {
  try {
    const meets = await OnlineMeet.find({ attendStatus: 0 });
    res.status(200).json(meets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch planned meets' });
  }
};

// Fetch all attended meets
exports.getAttendedMeets = async (req, res) => {
  try {
    const meets = await OnlineMeet.find({ attendStatus: 2 });
    res.status(200).json(meets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attended meets' });
  }
};

// Add a meet
exports.addMeet = async (req, res) => {
  try {
    const meet = new OnlineMeet(req.body);
    await meet.save();

    // Update chomulation stats
    const { chomulationCode } = req.body;
    await Chomulation.findOneAndUpdate(
      { chomulationCode },
      { $inc: { totalTimeSpent: 1 } } // Adjust as per requirements
    );

    res.status(201).json(meet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add meet' });
  }
};

// Update a meet
exports.updateMeet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMeet = await OnlineMeet.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMeet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meet' });
  }
};

// Delete a meet
exports.deleteMeet = async (req, res) => {
  try {
    const { id } = req.params;
    const meet = await OnlineMeet.findByIdAndDelete(id);

    // Update chomulation stats
    if (meet) {
      await Chomulation.findOneAndUpdate(
        { chomulationCode: meet.chomulationCode },
        { $inc: { totalTimeSpent: -1 } } // Adjust as per requirements
      );
    }

    res.status(200).json({ message: 'Meet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meet' });
  }
};
