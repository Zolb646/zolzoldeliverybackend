import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    if (verified.role.toLowerCase() !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const getId = req.params.userId;
    const deletedUser = await UserModel.findByIdAndDelete(getId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "user deleted successfully",
      user: deletedUser,
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
    console.log(err);

    res.status(500).json({
      message: "Failed to delete user",
      error: err.message,
    });
  }
};
