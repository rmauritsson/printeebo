const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck, creatorCheck } = require("../middlewares/auth");

// controllers
const {
  createStore,
  readStore,
  updateStore,
  deleteStore,
  listStores,
} = require("../controllers/StoreController");

router.get("/stores", listStores);
router.get("/store/:slug", readStore);
router.post("/store", authCheck, creatorCheck, createStore);
router.put("/store/:slug", authCheck, creatorCheck, updateStore);
router.delete("/store/:slug", authCheck, adminCheck, deleteStore);

module.exports = router;
