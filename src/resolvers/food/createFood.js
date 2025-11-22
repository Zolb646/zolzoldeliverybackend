import { FoodModel } from "../../model/foodModel.js";

export const createFood = async (req, res) => {
  try {
    const food = await FoodModel.create({
      foodName: req.body.foodName,
      price: req.body.price,
      imageUrl: req.body.imageUrl || "",
      category: req.body.category || "",
      ingredients: req.body.ingredients || "",
    });

    res.status(201).json({
      message: "Food created successfully (Admin access).",
      food,
    });
  } catch (error) {
    console.error("Error creating food:", error);
    res.status(500).json({ message: "Server error while creating food." });
  }
};
