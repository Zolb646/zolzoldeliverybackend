import { UserModel } from "../model/authModel.js";

export const checkEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true });
    }

    res.status(200).json({ exists: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
