const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Middleware for authentication
const {
  getAvailableUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getCouncilDetails,
} = require('../controllers/councilController'); // Import controller functions

const router = express.Router();

// **Council Routes**
router.get('/available-users/:query', protect, getAvailableUsers);

// 1. Send a Partner Request
router.post('/send-request', protect, sendFriendRequest);

// 2. Accept a Partner Request
router.post('/accept/:sender', protect, acceptFriendRequest);

// 3. Reject a Partner Request
router.post('/reject/:sender', protect, rejectFriendRequest);

// 4. Cancel a Sent Request
router.delete('/cancel/:sender', protect, cancelFriendRequest);

// 5. Get Council Details
router.get('/details/:username', protect, getCouncilDetails);

module.exports = router;
