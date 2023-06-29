const { model, Schema } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    validate: {
      validator: (val) => validator.isEmail(val),
      message: "Invalid email address",
    },
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [6, "Please provide at least 6 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please provide your confirm password"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password and confirm password must be the same",
    },
  },
  photo: {
    type: String,
    default: "image/default_photo.jpeg",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return bcrypt.compare(inputPassword, userPassword);
};

module.exports = model("User", userSchema);
