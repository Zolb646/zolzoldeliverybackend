import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  try {
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
