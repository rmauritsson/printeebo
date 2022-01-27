const admin = require("../firebase");
const User = require("../models/UserModel");

exports.authCheck = async (req, res, next) => {
  try {
    //console.log("Headers", req.headers);
    if (req.headers.authtoken) {
      const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
      //console.log("Firebase User in AUth Check", firebaseUser);
      req.user = firebaseUser;
      next();
    } else {
      console.log("Invalid Token");
    }
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    //get email of logged in user
    const { email } = req.user;
    //query database for role of user
    const adminUser = await User.findOne({ email }).exec();
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.creatorCheck = async (req, res, next) => {
  try {
    //get email of logged in user
    const { email } = req.user;
    //query database for role of user
    const storeOwner = await User.findOne({ email }).exec();
    if (storeOwner.role !== "creator") {
      res.status(403).json({
        err: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};
