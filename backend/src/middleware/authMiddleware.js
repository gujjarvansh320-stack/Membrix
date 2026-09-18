import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if the token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using your secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user and attach them to the request (exclude the password)
      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      // Move to the next middleware or controller
      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token provided" });
  }
};