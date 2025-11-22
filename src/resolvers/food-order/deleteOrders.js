import { foodOrderModel } from "../../model/foodOrderModel.js";

export const deleteFoodOrder = async (req, res) => {
  try {
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
