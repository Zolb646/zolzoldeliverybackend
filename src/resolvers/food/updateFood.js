import { FoodModel } from "../../model/foodModel.js";

export const updateFoodDetails = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const updatedFood = await FoodModel.findByIdAndUpdate(foodId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found." });
    }

    res.status(200).json({
      message: "Food updated successfully (Admin access).",
      food: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ message: "Server error while updating food." });
  }
};
