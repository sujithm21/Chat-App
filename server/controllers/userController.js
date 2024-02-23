const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userNameCheck = await User.findOne({ username });
    if (userNameCheck)
      return res.json({ msg: "username already present", status: false });

    const userEmailCheck = await User.findOne({ email });
    if (userEmailCheck)
      return res.json({ msg: "email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 15);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
