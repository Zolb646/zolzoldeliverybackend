import { foodOrderModel } from "../../model/foodOrderModel.js";

export const deleteFoodOrder = async (req, res) => {
  try {
    const deleteId = req.params.foodOrderId;

    const order = await foodOrderModel.findById(deleteId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
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
