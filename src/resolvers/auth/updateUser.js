import { UserModel } from "../../model/authModel.js";
import jwt from "jsonwebtoken";

export const updateUser = async (req, res) => {
  try {
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
