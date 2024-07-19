const CustomErr = require("../errorMiddleware/customErrorHandle");
const SignUpModel = require("../models/signUpModel");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const logInDetails = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new CustomErr("All fields are required", 400));
    }

    const foundUser = await SignUpModel.findOne({ email });

    if (!foundUser) {
      res.status(400).json({ message: "User is Not available" });
    } else {
      const conpaedPass = await bcrypt.compare(password, foundUser.password);

      if (conpaedPass) {
        var token = jwt.sign({ email }, process.env.SECREATEKEY);

        res
          .status(200)
          .json({ message: "Log-In successful", jsonToken: token });
      } else {
        res.status(400).json({ message: "Password is incorrect" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = logInDetails;
