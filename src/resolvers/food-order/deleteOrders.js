import jwt from "jsonwebtoken";
import { foodOrderModel } from "../../model/foodOrderModel.js";

export const deleteFoodOrder = async (req, res) => {
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

    const deleteId = req.params.foodOrderId;

    const order = await foodOrderModel.findById(deleteId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    if (
      order.user.toString() !== verified.id &&
      verified.role.toLowerCase() !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied. You can only delete your own orders.",
      });
    }

    const deletedOrder = await foodOrderModel.findByIdAndDelete(deleteId);

    res.status(200).json({
      message: "Order deleted successfully.",
      order: deletedOrder,
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error while deleting order." });
  }
};
