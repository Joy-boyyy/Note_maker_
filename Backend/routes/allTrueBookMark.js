const Notes = require("../models/notesModel");

const myTrueAllNotes = async (req, res, next) => {
  const { email } = req.query;
  try {
    const allNotes = await Notes.find({ userDetail: email, archived: true });
    if (allNotes.length > 0) {
      res.status(200).json({
        message: "Your Bookmark is ready...",
        myNotes: allNotes,
      });
    } else {
      res.status(200).json({ message: "No Any Bookmark is Selected" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = myTrueAllNotes;
