import { foodOrderModel } from "../../model/foodOrderModel.js";

export const getFoodOrder = async (req, res) => {
  try {
    const orders = await foodOrderModel.find().populate([
      {
        path: "user",
        populate: {
          path: "orderedFoods",
        },
      },
      {
        path: "foodOrderItems.food",
        select: "foodName price imageUrl",
      },
    ]);

    res.status(200).json({
      message: "Orders fetched successfully (Admin access).",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error while fetching orders." });
  }
};
