import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(" ")[1]; // ✅ Correct token extraction

  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // ✅ Debugging
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // ✅ Debugging
    return res.status(403).json({ message: "Invalid or expired token" });
  }
  
};
