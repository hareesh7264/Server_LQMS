// const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers['authorization'];

//   // Check if there is no token in the authorization header
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Access Denied' });
//   }

//   // Extract the token from the "Bearer <token>" format
//   const token = authHeader.split(' ')[1];

//   try {
//     // Verify the token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach the decoded token (user data) to the request object
//     req.user = verified;

//     // Proceed to the next middleware or route
//     next();
//   } catch (error) {
//     // If token verification fails, return an invalid token response
//     res.status(403).json({ message: 'Invalid Token' });
//   }
// };

// module.exports = authMiddleware;

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user info to request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
