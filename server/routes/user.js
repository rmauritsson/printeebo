const express = require("express");

const router = express.Router();

//Create or update User
router.get("/user", (req, res) => {
  res.json({
    message: "Create or Update User End Point",
  });
});

module.exports = router;
