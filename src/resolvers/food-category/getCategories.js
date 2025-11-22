import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await foodCategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching food categories:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching food categories." });
  }
};
