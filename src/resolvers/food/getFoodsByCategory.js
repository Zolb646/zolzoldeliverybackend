import { FoodModel } from "../../model/foodModel.js";

export const getFoodsByCategory = async (req, res) => {
  try {
    const getCategoryId = req.params.categoryId;

    const foodsByCategory = await FoodModel.find({
      category: getCategoryId,
    }).populate("category");

    res
      .status(200)
      .json({ message: "successfully fetched foods", food: foodsByCategory });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "failed to fetch" });
  }
};
