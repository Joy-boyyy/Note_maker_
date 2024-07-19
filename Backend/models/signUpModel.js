const mongoose = require("../dbConnection/dbConnect");
const schema = new mongoose.Schema(
  {
    _id: { type: String },
    username: { type: String, lowercase: true, trim: true, required: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

const SignUpModel = mongoose.model("signup", schema);

module.exports = SignUpModel;
