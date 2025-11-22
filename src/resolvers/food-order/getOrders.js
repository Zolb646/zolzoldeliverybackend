import jwt from "jsonwebtoken";
import { foodOrderModel } from "../../model/foodOrderModel.js";

export const getFoodOrder = async (req, res) => {
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
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

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
