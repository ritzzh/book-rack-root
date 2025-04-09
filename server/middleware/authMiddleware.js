const jwt = require('jsonwebtoken');

// Protect Middleware
exports.protect = (req, res, next) => {
  // Extract Authorization Header
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header is missing or invalid' });
  }

  // Extract Token
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error('JWT Verification Failed:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-Based Middleware (Optional - For Future Use)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};
