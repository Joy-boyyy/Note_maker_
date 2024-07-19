const Notes = require("../models/notesModel");

const modifyBookmark = async (req, res, next) => {
  const { boolVal, id } = req.body;
  try {
    const updatedClr = await Notes.findByIdAndUpdate(
      id,
      {
        $set: {
          archived: boolVal,
        },
      },
      { new: true }
    );
    console.log("updated data=>", updatedClr);
    res
      .status(200)
      .json({ message: "Archived updated successfully", updatedClr });
  } catch (err) {
    console.log("receiving error");
    next(err);
  }
};
module.exports = modifyBookmark;
