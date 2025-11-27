import { UserModel } from "../../model/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      message: "Signed in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to sign in",
      error: err.message,
    });
  }
};
