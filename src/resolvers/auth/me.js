import jwt from "jsonwebtoken";
import { UserModel } from "../../model/authModel.js";

export const Me = async (req, res) => {
  const localToken = req.headers.authorization;
  if (!localToken || !localToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid or missing token" });
  }
  const token = localToken.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(id);
    console.log("DECODED TOKEN ID:", id);
    console.log("FOUND USER:", user);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized", err: err.message });
  }
};
