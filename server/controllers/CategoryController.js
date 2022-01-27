const Category = require("../models/CategoryModel");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({
      name: name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(category);
  } catch (error) {
    res.status(400).send("Failed to create category");
  }
};

exports.readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send("Failed to Find Category");
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { slug: req.params.slug },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  res.json(category);
  try {
  } catch (err) {
    res.status(400).send("Failed to update category");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(category);
  } catch (error) {
    res.status(400).send("Failed to delete Category");
  }
};

exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    res.json(categories);
  } catch (error) {
    res.status(400).send("Failed to fetch categories");
  }
};
