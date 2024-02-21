const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 3,
    max: 20,
    required: true,
    unique: true,
  },
  email: {
    type: string,
    max: 20,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    min: 7,
    required: true,
  },
  isAvaatrImage: {
    type: boolean,
    default: false,
  },
  avatarImage: {
    type: string,
    defalut: "",
  },
});

module.exports = mongoose.model("users", userSchema);
