const Notes = require("../models/notesModel");

const didDelete = async (req, res, next) => {
  const { email, id } = req.body;

  try {
    const deletedRes = await Notes.deleteOne({
      userDetail: email,
      _id: id,
    });

    if (deletedRes.deletedCount === 1) {
      res.status(204).json({ message: "Note deleted successfully" });
      console.log("Note deleted successfully");
    } else {
      res.status(404).json({ message: "Note not found" });
      console.log("Note not found");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = didDelete;
