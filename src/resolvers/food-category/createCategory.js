import jwt from "jsonwebtoken";
import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const createFoodCategory = async (req, res) => {
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

    const foodCat = req.body;
    const foodCategory = await foodCategoryModel.create({
      categoryName: foodCat.categoryName,
    });

    res.status(201).json({
      message: "Food category created successfully (Admin access).",
      category: foodCategory,
    });
  } catch (error) {
    console.error("Error creating food category:", error);
    res.status(500).json({ message: "Server error while creating category." });
  }
};
