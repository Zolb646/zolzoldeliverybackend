import { UserModel } from "../../model/authModel.js";
import bcrypt from "bcryptjs";

export const signUpUsers = async (req, res) => {
  try {
    const { email, password, phoneNumber, address, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || "",
      address: address || "",
      role: role || "USER",
    });

    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to create user",
      error: err.message,
    });
  }
};
