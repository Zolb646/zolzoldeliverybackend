import jwt from "jsonwebtoken";
import { UserModel } from "../../model/authModel";

export const Me = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(id);

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized", err: err.message });
  }
};
