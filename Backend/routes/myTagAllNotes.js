const Notes = require("../models/notesModel");

const myTagNotes = async (req, res, next) => {
  const { tag, email } = req.query;
  try {
    // making search in array for selected data
    const allNotes = await Notes.find({
      userDetail: email,
      tags: { $in: [tag] },
    });

    console.log("all tag data", allNotes);

    if (allNotes.length > 0) {
      res
        .status(200)
        .json({ message: "Successfully Fetched...", myTagNotes: allNotes });
    } else {
      console.log("length is not more that 1");
      res.status(200).json({ message: "Not Any Tag Available" });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
module.exports = myTagNotes;
