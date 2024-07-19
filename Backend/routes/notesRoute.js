const CustomErr = require("../errorMiddleware/customErrorHandle");
const Notes = require("../models/notesModel");

const notesDetails = async (req, res, next) => {
  const { title, description, tags, userDetail } = req.body;

  try {
    if (!title || !description || !tags || !userDetail) {
      return next(new CustomErr("All fields are required", 400));
    }

    const notesModelInstance = new Notes({
      userDetail,
      title,
      description,
      tags,
    });

    const resData = await notesModelInstance.save();

    console.log(resData);
    res.status(200).json({ message: "Data Created", data: resData });
  } catch (err) {
    next(err);
  }
};

module.exports = notesDetails;
