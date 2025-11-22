import { FoodModel } from "../../model/foodModel.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find().populate("category");

    res
      .status(200)
      .json({ message: "successfully fetched foods", food: foods });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "failed to fetch" });
  }
};
