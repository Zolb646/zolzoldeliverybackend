import jwt from "jsonwebtoken";
import { foodOrderModel } from "../../model/foodOrderModel.js";

export const getFoodOrderById = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const userId = req.params.userId;

    if (verified.id !== userId && verified.role.toLowerCase() !== "admin") {
      return res.status(403).json({
        message: "Access denied. You can only access your own orders.",
      });
    }

    const orders = await foodOrderModel
      .find({ user: userId })
      .populate("user", "-password")
      .populate("foodOrderItems.food");

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};
