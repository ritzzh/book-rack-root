const Chomulation = require('../models/Chomulation');
const User = require('../models/User');

// Get available users without partners
exports.getAvailableUsers = async (req, res) => {
  const { query } = req.query;

  try {
    let users;
    if (query) {
      // Case-insensitive matching with regex
      users = await User.find({
        username: { $regex: query, $options: "i" }, // Regex match
        partner: null,
      }).select("username email");
    } else {
      users = await User.find({ chomulation: null }).select("username email");
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.sendChomulationRequest = async (req, res) => {
  const { sender, receiver } = req.body // Extracted from middleware
  console.log(`chomulation request recieved from ${sender} for ${receiver}`)
  try {
    const senderUser = await User.findOne({username: sender});
    const receiverUser = await User.findOne({ username: receiver });

    if (!receiverUser) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Check if already has a partner
    if (receiverUser.partner || senderUser.partner) {
      return res.status(400).json({ message: 'One or both users already have a partner' });
    }

    // Check for duplicate requests
    if (receiverUser.partnerRequest?.includes(senderUser.username)) {
      return res.status(400).json({ message: 'Request already sent' });
    }
    const request = {
      username: senderUser.username,
      gender: senderUser.gender,
      age: senderUser.age,
      sentAt: new Date()
    }

    receiverUser.partnerRequest.push(request);
    await receiverUser.save();
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Accept a partner request
exports.acceptChomulationRequest = async (req, res) => {
  const { sender } = req.params; // Request ID
  const { receiver } = req.body;

  try {
    const receiverUser = await User.findOne({username: receiver});
    const senderUser = await User.findOne({ username: sender });

    if (!receiverUser || !senderUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(receiverUser.partnerRequest)
    const hasRequest = receiverUser?.receivedPartnerRequest?.entries(entry=> entry.username == senderUser.username)

    if (!hasRequest) {
      return res.status(400).json({ message: 'Request not found' });
    }

    const chomulation = new Chomulation({
      initiator: senderUser.username,
      reciprocator: receiverUser.username,
      chomulation: `${senderUser.username}-pulled-${receiverUser.username}`,
      startDate: new Date(),
    });

    await chomulation.save();
    receiverUser.partner = senderUser.username;
    senderUser.partner = receiverUser.username;
    receiverUser.chomulation = senderUser.chomulation = chomulation.chomulation;
    receiverUser.receivedPartnerRequest = [];
    senderUser.sentPartnerRequest = [];

    await receiverUser.save();
    await senderUser.save();

    res.status(200).json({ message: 'Request accepted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.rejectChomulationRequest = async (req, res) => {
  const { sender } = req.params; // Request ID
  const { receiver } = req.body; // Extracted from middleware

  console.log(`request from ${sender} rejected by ${receiver}`);
  try {
    const receiverUser = await User.findOne({username: receiver});

    // Remove the request
    receiverUser.partnerRequest = receiverUser.partnerRequest.filter(
      (item)=>{
        return item.username != sender
      })

    await receiverUser.save();
    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Cancel a sent request
exports.cancelChomulationRequest = async (req, res) => {
  const { requestId } = req.params; // Request ID
  const sender = req.user; // Extracted from middleware

  try {
    const receiverUser = await User.findOne({ username: requestId });

    if (!receiverUser) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    receiverUser.partnerRequests = receiverUser.partnerRequests.filter(
      (req) => req !== sender
    );

    await receiverUser.save();
    res.status(200).json({ message: 'Request canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Fetch Chomulation details
exports.getChomulationDetails = async (req, res) => {
  const { username } = req.params; // Extracted from middleware
  console.log(username)
  try {
    const user = await User.findOne({username:username});

    const chomulation = await Chomulation.findOne({
      chomulation: user.chomulation
    });

    if (!chomulation) {
      return res.status(404).json({ message: 'Chomulation not found' });
    }

    res.status(200).json(chomulation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
