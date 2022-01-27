const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck, creatorCheck } = require("../middlewares/auth");

// controllers
const {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  listCategories,
} = require("../controllers/CategoryController");

router.get("/categories", listCategories);
router.get("/category/:slug", readCategory);
router.post("/category", authCheck, adminCheck, createCategory);
router.put("/category/:slug", authCheck, adminCheck, updateCategory);
router.delete("/category/:slug", authCheck, adminCheck, deleteCategory);

module.exports = router;
