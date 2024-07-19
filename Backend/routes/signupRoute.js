const CustomErr = require("../errorMiddleware/customErrorHandle");
const SignUpModel = require("../models/signUpModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const signUpDetails = async (req, res, next) => {
  const { _id, username, email, password } = req.body;
  try {
    if ((!_id, !username || !email || !password)) {
      return next(new CustomErr("All fields are required", 400));
    }

    /* Checking if a user with the given email already exists in the
database. if present then Sending Message to user */

    const foundUser = await SignUpModel.findOne({ email });

    if (foundUser) {
      res.status(400).json({ message: "User is already available" });
    } else {
      /* Below `bcrypt.genSalt(10, function (err, salt) { ... }` is generating a salt value to be
used in hashing the password. The `genSalt` function in the `bcrypt` library is used to generate a
salt asynchronously. */

      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res
            .status(500)
            .json({ message: "While salting got few error" });
        }

        /* The code snippet you provided is using the `bcrypt` library to hash the user's password before
storing it in the database. Here's a breakdown of what the code is doing: */

        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            return res
              .status(500)
              .json({ message: "While salting got few error" });
          }

          const signupModelInstance = new SignUpModel({
            _id,
            username,
            email,
            password: hash,
          });

          const resData = await signupModelInstance.save();

          //creating JWT TOken

          var token = jwt.sign({ email }, process.env.SECREATEKEY);
          console.log(resData);
          res.status(200).json({ message: "user Created", jsonToken: token });
        });
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = signUpDetails;
