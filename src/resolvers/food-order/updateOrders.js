import { foodOrderModel } from "../../model/foodOrderModel.js";

export const updateFoodOrder = async (req, res) => {
  try {
    const foodOrderId = req.params.foodOrderId;
    const orderUpdate = req.body;

    const order = await foodOrderModel.findById(foodOrderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
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
