import { FoodModel } from "../../model/foodModel.js";

export const createFood = async (req, res) => {
  try {
    let finalImageUrl;

    if (req.file) {
      finalImageUrl = req.file.path;
    }
    if (!finalImageUrl) {
      return res.status(400).json({ message: "Image required" });
    }
    const food = await FoodModel.create({
      foodName: req.body.foodName,
      price: req.body.price,
      imageUrl: finalImageUrl,
      category: req.body.category,
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
