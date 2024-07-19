import "./index.css";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { ContextApiCreate } from "../../contextApi/ContextApi";
import { v4 as uuid } from "uuid";
import { useNavigate, Navigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

import Cookies from "js-cookie";

const BookmarkComp = () => {
  const myCOntextIns = useContext(ContextApiCreate);
  const [BckendMessage, setBackendMessage] = useState("");
  const [dataCOll, setColl] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callMeCollection = async () => {
      try {
        const myColl = await axios.get(
          `http://localhost:8000/allBookmark?email=${myCOntextIns.userDetails.email}`
        );

        if (myColl.data.mesage === "No Any Bookmark is Selected") {
          setBackendMessage(myColl.data.mesage);
        } else {
          setBackendMessage(myColl.data.message);

          const myAllNoteData = myColl.data.myNotes.map((mapProp) => ({
            createdAt: mapProp.createdAt,
            description: mapProp.description,
            tags: mapProp.tags,
            title: mapProp.title,
            bgClr: mapProp.bgClr,
          }));

          setColl(myAllNoteData);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message);
        } else {
          console.log(err.message);
        }
      }
    };

    callMeCollection();
  }, [myCOntextIns.userDetails.email]);

  const cookieGot = Cookies.get("jsonToken");
  if (cookieGot === undefined) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="BookmarkDiv">
      <div className="childBookMark">
        <div className="toBack">
          <IoArrowBack
            size={30}
            onClick={() => {
              navigate("/");
            }}
            className="backArrCl"
          />
        </div>

        <div className="bgMessageSho">
          {BckendMessage && <h1>{BckendMessage}</h1>}
        </div>

        {dataCOll.length > 0 && (
          <div className="allNotesCl">
            {dataCOll.map((mapProp) => (
              <div
                className="cardDIv"
                key={uuid()}
                style={{ backgroundColor: mapProp.bgClr }}
              >
                <p>{mapProp.title}</p>
                <p>{mapProp.description}</p>

                <br />
                <hr />

                <p>Date:- {new Date(mapProp.createdAt).toLocaleDateString()}</p>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkComp;
