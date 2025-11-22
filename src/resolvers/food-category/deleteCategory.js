import jwt from "jsonwebtoken";
import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const deleteCategory = async (req, res) => {
  try {
    const deleteId = req.params.foodCategoryId;
    const deletedCategory = await foodCategoryModel.findByIdAndDelete(deleteId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category deleted successfully (Admin access).",
      id: deleteId,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Server error while deleting category." });
  }
};
