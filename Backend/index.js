const express = require("express");
require("dotenv").config();
const ErrorHandleMiddleware = require("./errorMiddleware/errorHandle");
const signUpDetails = require("./routes/signupRoute");
const logInDetails = require("./routes/signInRoute");
const notesDetails = require("./routes/notesRoute");
const myAllNotes = require("./routes/myAllNotesRoute");
const myTagNotes = require("./routes/myTagAllNotes");
const notesBgChangeRoute = require("./routes/notesBgChange");
const modifyBookmark = require("./routes/setBookMark");
const myTrueAllNotes = require("./routes/allTrueBookMark");
const didDelete = require("./routes/deleteRoute");
const doSearch = require("./routes/quickSearch");

var cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const myPortNum = process.env.PORT || 5000;

//-----------------------sign up code

app.post("/signup", signUpDetails);

//----------------login code

app.post("/login", logInDetails);

//-----------------Notes Creating
app.post("/notes", notesDetails);

// -----------------Fetching all Notes
app.get("/myNotes", myAllNotes);

// Tag Based all Data

app.get("/tagNote", myTagNotes);

// CHange Bg COlor

app.put("/notesBg", notesBgChangeRoute);

//-----------------BOokmark

app.put("/bookmark", modifyBookmark);

//-------------all bookmark
app.get("/allBookmark", myTrueAllNotes);

//---------------Delete Selected Card

app.delete("/delete", didDelete);

//--------------Quick Search

app.get("/search", doSearch);

//---------middle ware to handle error

app.use(ErrorHandleMiddleware);

app.listen(myPortNum, () => {
  console.log(`Ouir Server is Connected On Port Number :- ${myPortNum}`);
});
