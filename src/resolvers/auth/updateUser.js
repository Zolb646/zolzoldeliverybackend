import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const updateUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role?.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Admins only." });
    }

    const getId = req.params.userId;
    const userData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(getId, userData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(403).json({
        message: "Invalid or expired token.",
        error: err.message,
      });
    }
    console.error(err);

    res.status(500).json({
      message: "Something went wrong while updating the user",
      error: err.message,
    });
  }
};
