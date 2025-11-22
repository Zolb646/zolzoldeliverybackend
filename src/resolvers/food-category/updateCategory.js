import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const updateFoodCategory = async (req, res) => {
  try {
    const foodCatId = req.params.foodCategoryId;
    const { categoryName } = req.body;

    const updatedCat = await foodCategoryModel.findByIdAndUpdate(
      foodCatId,
      { categoryName },
      { new: true, runValidators: true }
    );

    if (!updatedCat) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully (Admin access).",
      category: updatedCat,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Server error while updating category." });
  }
};
