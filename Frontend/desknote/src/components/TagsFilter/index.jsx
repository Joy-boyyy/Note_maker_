import { useContext, useEffect, useState } from "react";
import "./index.css";
import { ContextApiCreate } from "../../contextApi/ContextApi";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const TagsFilter = () => {
  const myCOntextIns = useContext(ContextApiCreate);
  const [selectedTag, setSelectedTag] = useState("#notes");
  const [gotErr, setErr] = useState("");
  const [noTag, setNoTag] = useState("");
  const [tagData, setTagData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        const tagRelatedData = await axios(
          `http://localhost:8000/tagNote?tag=%23${
            selectedTag.slice(1) || "Notes"
          }&email=${myCOntextIns.userDetails.email}`
        );

        setErr("");

        if (tagRelatedData.data.message === "Not Any Tag Available") {
          setNoTag(tagRelatedData.data.message);
          setTagData([]);
        } else {
          setNoTag("");

          const modifiedData = tagRelatedData.data.myTagNotes.map(
            (mapPropData) => ({
              createdAt: mapPropData.createdAt,
              description: mapPropData.description,
              tags: mapPropData.tags,
              title: mapPropData.title,
              bgClr: mapPropData.bgClr,
            })
          );

          setTagData(modifiedData);

          // console.log(tagRelatedData.data.myTagNotes);
        }
      } catch (err) {
        if (err.response) {
          setErr(err.response.data.message);
        } else {
          console.log(err.message);
          setErr(err.message);
        }
      }
    };
    fetchTagData();
  }, [selectedTag, myCOntextIns.userDetails.email]);

  const cookieGot = Cookies.get("jsonToken");
  if (cookieGot === undefined) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="TagsParent">
      <div className="TagCHild">
        <div className="goBack">
          <IoArrowBack
            size={30}
            onClick={() => {
              navigate("/");
            }}
            className="backArrCl"
          />
        </div>

        <div className="tagSection">
          {myCOntextIns.userDetails.tags.map((mapProp) => (
            <button
              key={mapProp}
              type="button"
              className={`tagBtns ${selectedTag === mapProp && "bgChange"}`}
              onClick={() => {
                setSelectedTag(mapProp);
              }}
            >
              {mapProp}
            </button>
          ))}
        </div>

        <div className="lineDIv"></div>

        <div className="selectedTag">
          {gotErr && <p>{gotErr}</p>}
          {noTag && <p>{noTag}</p>}

          {tagData.length > 0 && (
            <div className="allNotesCl">
              {tagData.map((mapProp) => (
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
  );
};

export default TagsFilter;
