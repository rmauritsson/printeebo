const User = require("../models/UserModel");

exports.authUser = async (req, res) => {
  console.log("Users", req.user);
  const { name, picture, email } = req.user;

  //Update if User exists or create
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    //console.log("User Updated", user);
    res.json(user);
  } else {
    const newUser = await new User({ email, name, picture }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
