const Notes = require("../models/notesModel");

const myAllNotes = async (req, res, next) => {
  const { email } = req.query;
  try {
    const allNotes = await Notes.find({ userDetail: email }).populate(
      "userDetail"
    );
    if (allNotes.length > 0) {
      res
        .status(200)
        .json({ message: "Successfully Fetched...", myNotes: allNotes });
    } else {
      res.status(200).json({ message: "Not Any Notes Available" });
    }
  } catch (err) {
    next(err);
  }
};
module.exports = myAllNotes;
