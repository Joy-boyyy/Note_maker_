const mongoose = require("../dbConnection/dbConnect");
const schema = new mongoose.Schema(
  {
    userDetail: {
      type: String,
      ref: "signup",
      require: true,
    },
    title: { type: String, lowercase: true, trim: true, required: true },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    tags: { type: [String], required: true },
    archived: { type: Boolean, default: false },
    bgClr: { type: String, default: "white" },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Note", schema);

module.exports = Notes;

///////////////////
