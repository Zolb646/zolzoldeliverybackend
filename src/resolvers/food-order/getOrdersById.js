import { foodOrderModel } from "../../model/foodOrderModel.js";

export const getFoodOrderById = async (req, res) => {
  try {
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
