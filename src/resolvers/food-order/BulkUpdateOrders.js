import { foodOrderModel } from "../../model/foodOrderModel.js";

export const bulkUpdateFoodOrder = async (req, res) => {
  try {
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
