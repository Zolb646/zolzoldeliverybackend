import jwt from "jsonwebtoken";
import { foodOrderModel } from "../../model/foodOrderModel.js";

export const bulkUpdateFoodOrder = async (req, res) => {
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

    if (verified.role.toLowerCase() !== "admin") {
      return res.status(403).json({
        message: "Access denied. Only admin can bulk update orders.",
      });
    }

    const { orderIds } = req.body;
    const orderUpdate = req.body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return res.status(400).json({ message: "orderIds array is required" });
    }

    const result = await foodOrderModel.updateMany(
      { _id: { $in: orderIds } },
      { $set: orderUpdate }
    );

    res.status(200).json({
      message: "Orders updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error while updating order." });
  }
};
