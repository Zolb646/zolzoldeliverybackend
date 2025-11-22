import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const createFoodCategory = async (req, res) => {
  try {
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
