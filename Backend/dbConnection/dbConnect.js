const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOATLAS)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(`Db Connection err:- ${err.message}`);
  });

module.exports = mongoose;

// desktopNoteDb;
