import { foodCategoryModel } from "../../model/foodCategoryModel.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await foodCategoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "category",
          as: "foods",
        },
      },
      {
        $addFields: {
          foodCount: { $size: "$foods" },
        },
      },
      {
        $project: {
          foods: 0,
        },
      },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching food categories:", error);
    res.status(500).json({
      message: "Server error while fetching food categories.",
    });
  }
};
