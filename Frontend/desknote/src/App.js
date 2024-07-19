import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";
import MyAllNotes from "./components/AllNotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TagsFilter from "./components/TagsFilter";
import BookmarkComp from "./components/Bookmark";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myNotes" element={<MyAllNotes />} />
        <Route path="/myTags" element={<TagsFilter />} />
        <Route path="/bookmarks" element={<BookmarkComp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
