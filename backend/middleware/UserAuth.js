import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! No token found.",
      });
    }

    const decoded = jwt.verify(token, process.env.Jwt_secret);
    const user = await userModel.findById(decoded.id);

    if (!user || user.role !== 0) {
      return res.status(403).json({
        success: false,
        message: "Access denied!",
      });
    }

    req.user = user; // attach user for controller use
    next(); // ✅ allow route to continue
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or server error",
    });
  }
};

export default userAuth;
