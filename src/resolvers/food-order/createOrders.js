import { UserModel } from "../../model/authModel.js";
import { CounterModel } from "../../model/countModel.js";
import { foodOrderModel } from "../../model/foodOrderModel.js";
import { FoodModel } from "../../model/foodModel.js";

export const createFoodOrder = async (req, res) => {
  try {
    const { cart, status, shippingCost = 0 } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const user = await UserModel.findById(verified.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const foodOrderItems = [];
    let totalFoodPrice = 0;

    for (const item of cart) {
      const food = await FoodModel.findById(item._id);
      if (!food) continue;

      totalFoodPrice += food.price * item.quantity;
      foodOrderItems.push({
        food: food._id,
        quantity: item.quantity,
      });
    }

    const totalPrice = totalFoodPrice + shippingCost;

    const counter = await CounterModel.findOneAndUpdate(
      { name: "orderNumber" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const orderNumber = counter.value;

    const newOrder = await foodOrderModel.create({
      orderNumber: `#${orderNumber}`,
      user: verified.id,
      userAddress: user.address || "N/A",
      foodOrderItems,
      totalPrice,
      status: status || "PENDING",
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error while creating order" });
  }
};
