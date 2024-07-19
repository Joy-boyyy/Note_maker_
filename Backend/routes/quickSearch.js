const Notes = require("../models/notesModel");

const doSearch = async (req, res, next) => {
  const { email, search } = req.query;
  const regex = new RegExp(search, "i"); // 'i' for case-insensitive

  try {
    const foundData = await Notes.find({
      userDetail: email,
      $or: [{ title: regex }, { tags: { $in: [regex] } }],
    });

    console.log(foundData);
    res.status(200).json({ message: "Search result successful", foundData });
  } catch (err) {
    next(err);
  }
};

module.exports = doSearch;
