import "./index.css";
import { CiSearch } from "react-icons/ci";
import { BiBookAdd } from "react-icons/bi";
import { CiStickyNote } from "react-icons/ci";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { useState, useContext } from "react";
import CreateNoteComp from "../Note";
import axios from "axios";
import { ContextApiCreate } from "../../contextApi/ContextApi";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";

const Home = () => {
  const [showNote, setShowNote] = useState(false);
  const [searchVar, setSearch] = useState("");
  const [searchResData, setSearchResult] = useState("");
  const [meSearchVar, setInSearch] = useState([]);

  const myCOntextIns = useContext(ContextApiCreate);
  const navigate = useNavigate();

  const accessFormData = async (dataProp) => {
    setShowNote(dataProp.closeWindow);

    const notesData = {
      userDetail: myCOntextIns.userDetails.email,
      // userDetail: "anand@gmail.com",

      title: dataProp.TitleTxt,
      description: dataProp.CheckboxTxt,
      tags: dataProp.selectedTag,
    };

    try {
      const axiosRes = await axios.post(
        "http://localhost:8000/notes",
        notesData
      );
      console.log(axiosRes);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
        console.log(err.response);
      } else {
        console.log(err.message);
      }
    }
  };

  const closeWindowFun = ({ doClose }) => {
    setShowNote(doClose);
  };

  const doLogout = () => {
    Cookies.remove("jsonToken");
    Cookies.remove("myUniqueEmail");
    navigate("/signin");
  };

  const cookieGot = Cookies.get("jsonToken");
  if (cookieGot === undefined) {
    return <Navigate to="/signup" />;
  }

  const universalSearch = (e) => {
    setInSearch([]);
    setSearchResult("");
    setSearch(e.target.value);
  };

  const startSearching = async () => {
    try {
      const gotSearchRes = await axios(
        `http://localhost:8000/search?email=${myCOntextIns.userDetails.email}&search=${searchVar}`
      );
      console.log("got search", gotSearchRes);

      if (gotSearchRes.data.foundData.length < 1) {
        setSearchResult(
          "Could not find data, please give meaningful search..."
        );
      } else {
        setSearchResult("");

        const myAllNoteData = gotSearchRes.data.foundData.map((mapProp) => ({
          createdAt: mapProp.createdAt,
          description: mapProp.description,
          tags: mapProp.tags,
          title: mapProp.title,
          bgClr: mapProp.bgClr,
        }));

        setInSearch(myAllNoteData);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="HomeParent">
      <div className="hopmePrentChild1">
        <div className="HomeSearchDiv">
          <div className="HomeSearchSubDiv">
            <input
              type="search"
              placeholder="Search"
              className="searchInputCL"
              value={searchVar}
              onChange={universalSearch}
            />
            <button
              type="button"
              className="searchBtn"
              onClick={startSearching}
            >
              <CiSearch size={20} />
            </button>
          </div>
        </div>

        {/* ---------------------notes */}
        {showNote && (
          <CreateNoteComp
            accessFormData={accessFormData}
            closeWindowFun={closeWindowFun}
          />
        )}

        {/* ----------------Dashboard */}

        <div className="HomeDashboard">
          <div
            className="HomeAddNote cmnGrigCl"
            onClick={() => {
              setShowNote((revData) => !revData);
            }}
          >
            <BiBookAdd size={40} /> <span>Add Note</span>
          </div>
          <div
            className="HomeAllNote cmnGrigCl"
            onClick={() => {
              navigate("/myNotes");
            }}
          >
            <CiStickyNote size={40} /> <span>All Notes</span>
          </div>
          <div
            className="HomeCollectionNote cmnGrigCl"
            onClick={() => {
              navigate("/bookmarks");
            }}
          >
            <MdOutlineBookmarkAdded /> All Bookmarks
          </div>
          <div
            className="HomeTagNote cmnGrigCl"
            onClick={() => {
              navigate("/myTags");
            }}
          >
            <FaHashtag /> Tags
          </div>
          <div className="HomeLogout cmnGrigCl" onClick={doLogout}>
            <IoLogOutOutline /> Logout
          </div>
        </div>

        <div className="line"></div>

        <div className="errMessage">
          {searchResData && <h1>{searchResData}</h1>}
        </div>
        <div className="searchResClll">
          <div>
            {meSearchVar.length > 0 && (
              <div className="allNotesCl">
                {meSearchVar.map((mapProp) => (
                  <div
                    className="cardDIv"
                    key={uuid()}
                    style={{ backgroundColor: mapProp.bgClr }}
                  >
                    <p>{mapProp.title}</p>
                    <p>{mapProp.description}</p>

                    <br />
                    <hr />

                    <p>
                      Date:- {new Date(mapProp.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      Time:- {new Date(mapProp.createdAt).toLocaleTimeString()}
                    </p>

                    <br />
                    <hr />

                    <p className="paraTag">
                      {mapProp.tags.map((mapTagData) => (
                        <span key={uuid()} className="spanWithTag">
                          {mapTagData}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
