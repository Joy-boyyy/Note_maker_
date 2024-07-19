import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ContextApiCreate } from "../../contextApi/ContextApi";
import "./index.css";
import { v4 as uuid } from "uuid";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, Navigate } from "react-router-dom";
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const MyAllNotes = () => {
  const [allNotesArrVar, setAllNotes] = useState([]);
  const [userNameInstant, setUserName] = useState("");
  // const [bookMarkIns, setBookmark] = useState(false);
  const [clrSelected, setBgClr] = useState({
    bgClr: "",
    _id: "",
  });

  const navigate = useNavigate();

  const myCOntextIns = useContext(ContextApiCreate);

  useEffect(() => {
    const fetchFun = async () => {
      try {
        const myAllData = await axios(
          `http://localhost:8000/myNotes?email=${myCOntextIns.userDetails.email}`
        );

        if (myAllData.data.message === "Not Any Notes Available") {
          setUserName(myAllData.data.message);
        } else {
          setUserName(
            `Welcome ${myAllData.data.myNotes[0].userDetail.username.toUpperCase()} !!!`
          );

          const myAllNoteData = myAllData.data.myNotes.map((mapProp) => ({
            archived: mapProp.archived,
            createdAt: mapProp.createdAt,
            description: mapProp.description,
            tags: mapProp.tags,
            title: mapProp.title,
            _id: mapProp._id,
            bgClr: mapProp.bgClr,
          }));

          // console.log("all data ", myAllData.data.myNotes);

          setAllNotes(myAllNoteData);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message);
        } else {
          console.log(err.message);
        }
      }
    };

    fetchFun();
  }, [myCOntextIns.userDetails.email]);

  // console.log("clr Selected=", clrSelected);

  // ----bg change functionality

  const setBgClrFun = async (e, _id) => {
    const selectedBg = e.target.value;

    try {
      const backgroundCHangeDAta = {
        _id,
        bgClr: selectedBg,
      };
      const selectedBgClr = await axios.put(
        "http://localhost:8000/notesBg",
        backgroundCHangeDAta
      );

      const selectedData = selectedBgClr.data.updatedClr;

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === _id ? { ...note, bgClr: selectedBg } : note
        )
      );
      // const selectedBackgroundClr = selectedBgClr.data.bgClr;
      setBgClr({ bgClr: selectedData.bgClr, _id: selectedData._id });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  const doBookmark = async (gotId) => {
    const updatedNotes = allNotesArrVar.map((note) =>
      note._id === gotId ? { ...note, archived: !note.archived } : note
    );
    const newArchivedStatus = updatedNotes.find(
      (note) => note._id === gotId
    ).archived;

    try {
      await axios.put("http://localhost:8000/bookmark", {
        id: gotId,
        boolVal: newArchivedStatus,
      });

      setAllNotes(updatedNotes);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  // --------------------------Delete

  const doDeleteDunction = async (idToDel) => {
    console.log("mailChecking---", myCOntextIns.userDetails.email);
    console.log("idChecking---", idToDel);

    try {
      const deleteRes = await axios.delete("http://localhost:8000/delete", {
        data: {
          id: idToDel,
          email: myCOntextIns.userDetails.email,
        },
      });

      console.log(deleteRes);

      toast.success("Deleted", { position: "bottom-center" });

      setTimeout(() => {
        setAllNotes((prevData) =>
          prevData.filter((filterProp) => filterProp._id !== idToDel)
        );
      }, 1000);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else {
        console.log(err.message);
      }
    }
  };

  const cookieGot = Cookies.get("jsonToken");
  if (cookieGot === undefined) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="allNotesParent">
      <ToastContainer position="bottom-center" />
      <div className="h1BackBtn">
        <IoArrowBack
          size={30}
          onClick={() => {
            navigate("/");
          }}
          className="backArrCl"
        />

        <h1>{userNameInstant}</h1>
      </div>

      <div className="allNotesCl">
        {allNotesArrVar.map((mapProp) => (
          <div
            className="cardDIv"
            key={mapProp._id}
            style={{
              backgroundColor: `${
                mapProp._id === clrSelected._id
                  ? clrSelected.bgClr
                  : mapProp.bgClr
              }`,
            }}
          >
            <p>{mapProp.title}</p>
            <p>{mapProp.description}</p>

            <br />
            <hr />

            <p> Date:- {new Date(mapProp.createdAt).toLocaleDateString()}</p>
            <p>Time:- {new Date(mapProp.createdAt).toLocaleTimeString()}</p>

            <br />
            <hr />
            <p className="paraTag">
              {mapProp.tags.map((mapTagData) => (
                <span key={uuid()} className="spanWithTag">
                  {mapTagData}
                </span>
              ))}
            </p>

            {/* ---------------------------------notes Feature */}
            <hr />
            <div className="impToolsDiv">
              <div className="btCHangeFunct">
                <input
                  key={mapProp._id}
                  type="color"
                  value={
                    mapProp._id === clrSelected._id
                      ? clrSelected.bgClr
                      : mapProp.bgClr
                  }
                  onChange={(e) => setBgClrFun(e, mapProp._id)}
                  className="selectClrCl"
                />
              </div>

              <div className="archive">
                {mapProp.archived ? (
                  <CiBookmarkCheck
                    size={30}
                    className="collection"
                    onClick={() => doBookmark(mapProp._id)}
                    key={mapProp._id}
                  />
                ) : (
                  <CiBookmarkPlus
                    size={30}
                    className="collection"
                    onClick={() => doBookmark(mapProp._id)}
                    key={mapProp._id}
                  />
                )}
              </div>

              {/* ------------------------------- Delete functionality */}

              <div className="DeleteDiv">
                <MdDelete
                  key={mapProp._id}
                  size={30}
                  onClick={() => {
                    doDeleteDunction(mapProp._id);
                  }}
                />
              </div>
            </div>

            {/* -------------------- */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllNotes;
