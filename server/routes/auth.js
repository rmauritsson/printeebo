const express = require("express");

const router = express.Router();

// middleware
const { authCheck, adminCheck, creatorCheck } = require("../middlewares/auth");

// controllers
const { authUser, currentUser } = require("../controllers/AuthController");

const myMiddleware = (req, res, next) => {
  console.log("I am a middleware yey");
};

//Create or update User
//router.post("/auth", authCheck, authUser);

router.post("/auth", authCheck, authUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);
router.post("/current-creator", authCheck, creatorCheck, currentUser);

module.exports = router;
