const Council = require('../models/Council');
const User = require('../models/User');

// Get available users without partners
exports.getAvailableUsers = async (req, res) => {
  const { query } = req.params; // Retrieve query parameter
  console.log("Query received: ", query);

  try {
    let users;
    if (query) {
      // Case-insensitive matching with regex
      users = await User.find({
        username: { $regex: query, $options: "i" }, // Regex match
        friend: null,
      }).select("username email");
    } else {
      users = await User.find({ council: null }).select("username email");
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Send a partner request
exports.sendFriendRequest = async (req, res) => {
  const { sender, receiver } = req.body // Extracted from middleware
  console.log(`council request recieved from ${sender} for ${receiver}`)
  try {
    const senderUser = await User.findOne({username: sender});
    const receiverUser = await User.findOne({ username: receiver });

    if (!receiverUser) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Check if already has a partner
    if (receiverUser.friend || senderUser.friend) {
      return res.status(400).json({ message: 'One or both users already have a partner' });
    }

    // Check for duplicate requests
    if (receiverUser.friendRequest?.includes(senderUser.username)) {
      return res.status(400).json({ message: 'Request already sent' });
    }
    const request = {
      username: senderUser.username,
      gender: senderUser.gender,
      age: senderUser.age,
      sentAt: new Date()
    }

    receiverUser.friendRequest.push(request);
    await receiverUser.save();
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Accept a partner request
exports.acceptFriendRequest = async (req, res) => {
  const { sender } = req.params; // Request ID
  const { receiver } = req.body; 

  console.log(`council request accepted by ${receiver} from ${sender}`) 
  try {
    const receiverUser = await User.findOne({ username: receiver});
    const senderUser = await User.findOne({ username: sender });

    if (!receiverUser || !senderUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate request
    if (!receiverUser.friendRequest.entries(entry => entry.username == senderUser.username)) {
      return res.status(400).json({ message: 'Request not found' });
    }

    // Create Council
    const council = new Council({
      friendOne: senderUser.username,
      friendTwo: receiverUser.username,
      council: `Council-of-${senderUser.username}-&-${receiverUser.username}`,
      startDate: new Date(),
    });

    await council.save();
    receiverUser.friend = senderUser.username;
    receiverUser.friendRequest = [];
    receiverUser.council = council.council;
    
    senderUser.friend = receiverUser.username;
    senderUser.friendRequest = [];
    senderUser.council = council.council;

    // Remove request and save updates

    await receiverUser.save();
    await senderUser.save();

    res.status(200).json({ message: 'Request accepted successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Reject a partner request
exports.rejectFriendRequest = async (req, res) => {
  const { sender } = req.params; // Extracted from middleware
  const { receiver } = req.body; // Request ID

  console.log(`request from ${sender} rejected by ${receiver}`);
  try {
    const receiverUser = await User.findOne({username: receiver});

    // Remove the request
    console.log(receiverUser.friendRequest)
    receiverUser.friendRequest = receiverUser.friendRequest.filter(
      (item)=>{
        return item.username != sender
      })
    console.log(receiverUser.friendRequest)

    await receiverUser.save();
    res.status(200).json({ message: 'Request rejected successfully' });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Cancel a sent request
exports.cancelFriendRequest = async (req, res) => {
  const { receiver } = req.params; // Request ID
  const sender = req.user; // Extracted from middleware

  try {
    const receiverUser = await User.findOne({ username: receiver });

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

// Fetch Council details
exports.getCouncilDetails = async (req, res) => {
  const {username} = req.params; // Extracted from middleware
  console.log(username)
  try {
    const user = await User.findOne({username:username});

    const council = await Council.findOne({
      $or: [
        { friendOne: user.username },
        { friendTwo: user.username },
      ],
    });

    if (!council) {
      return res.status(404).json({ message: 'Council not found' });
    }

    res.status(200).json(council);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
