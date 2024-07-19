const Notes = require("../models/notesModel");

const notesBgChangeRoute = async (req, res, next) => {
  const { bgClr, _id } = req.body;
  try {
    const updatedClr = await Notes.findByIdAndUpdate(
      _id,
      {
        $set: {
          bgClr: bgClr,
        },
      },
      { new: true }
    );
    console.log("updated data=>", updatedClr);
    res
      .status(200)
      .json({ message: "Background color updated successfully", updatedClr });
  } catch (err) {
    console.log("receiving error");
    next(err);
  }
};

module.exports = notesBgChangeRoute;
