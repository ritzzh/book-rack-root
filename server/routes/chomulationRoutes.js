const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import updated middleware
const {
  sendChomulationRequest,
  acceptChomulationRequest,
  rejectChomulationRequest,
  getChomulationDetails,
  cancelChomulationRequest,
  removeChomulation,
  getAvailableUsers,
} = require('../controllers/chomulationContoller'); // Import controller functions

const router = express.Router();

// **Chomulation Routes**
router.get('/available-users', protect, getAvailableUsers);

// 1. Send Chomulation Request to a Partner
router.post('/sendrequest', protect, sendChomulationRequest);

// 2. Accept a Chomulation Request
router.post('/accept/:sender', protect, acceptChomulationRequest);

// 3. Reject a Chomulation Request
router.post('/reject/:sender', protect, rejectChomulationRequest);

// 4. Cancel a Sent Chomulation Request
router.delete('/cancel/:reciever', protect, cancelChomulationRequest);

// 6. Get Current Chomulation Details
router.get('/details/:username', protect, getChomulationDetails);

module.exports = router;
