const Store = require("../models/StoreModel");
const slugify = require("slugify");

exports.createStore = async (req, res) => {
  try {
    const { name, description } = req.body;
    const store = await new Store({
      name: name,
      description: description,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.json(store);
  } catch (error) {
    res.status(400).send("Failed to create store");
  }
};

exports.readStore = async (req, res) => {
  try {
    const store = await Store.findOne({ slug: req.params.slug }).exec();
    res.json(store);
  } catch (error) {
    res.status(400).send("Failed to find store");
  }
};

exports.updateStore = async (req, res) => {
  const { name, description } = req.body;

  const store = await Store.findOneAndUpdate(
    { slug: req.params.slug },
    { name: name, description: description, slug: slugify(name) },
    { new: true }
  );
  res.json(store);
  try {
  } catch (err) {
    res.status(400).send("Failed to update store");
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findOneAndDelete({ slug: req.params.slug });
    res.json(store);
  } catch (error) {
    res.status(400).send("Failed to delete store");
  }
};

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.find({}).sort({ createdAt: -1 }).exec();
    res.json(stores);
  } catch (err) {
    res.status(400).send("Failed to fetch stores");
  }
};
