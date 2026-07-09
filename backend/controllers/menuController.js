import MenuItem from "../models/menuItem.js";

export const getMenu = async (req, res) => {
  try {
    const meals = await MenuItem.find();
    res.json(meals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch menu items." });
  }
};
