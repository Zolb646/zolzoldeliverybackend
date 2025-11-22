import { FoodModel } from "../../model/foodModel.js";

export const deleteFood = async (req, res) => {
  try {
    const deleteId = req.params.foodId;
    const deletedFood = await FoodModel.findByIdAndDelete(deleteId);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food not found." });
    }

    res.status(200).json({
      message: "Food deleted successfully (Admin access).",
      id: deleteId,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    res.status(500).json({ message: "Server error while deleting food." });
  }
};
