import jwt from "jsonwebtoken";
import { foodOrderModel } from "../../model/foodOrderModel.js";

export const updateFoodOrder = async (req, res) => {
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

    const foodOrderId = req.params.foodOrderId;
    const orderUpdate = req.body;

    const order = await foodOrderModel.findById(foodOrderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (
      order.user.toString() !== verified.id &&
      verified.role.toLowerCase() !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You can only update your own orders.",
      });
    }

    const updatedOrder = await foodOrderModel.findByIdAndUpdate(
      foodOrderId,
      orderUpdate,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Food order updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error while updating order." });
  }
};
