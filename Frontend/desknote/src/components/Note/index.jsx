import "./index.css";
import { useState } from "react";
import { ImCross } from "react-icons/im";
// import { ContextApiCreate } from "../../contextApi/ContextApi";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const CreateNoteComp = (props) => {
  const [TitleTxt, titleAddFun] = useState("");
  const [CheckboxTxt, checkboxAddFun] = useState("");
  const [selectedTag, setSelectedTag] = useState(["#notes"]);
  // const myCOntextIns = useContext(ContextApiCreate);

  const { accessFormData, closeWindowFun } = props;

  const myTags = [
    "#Work",
    "#Ideas",
    "#Important",
    "#Meeting",
    "#Study",
    "#Finance",
    "#Health",
    "#Shopping",
    "#Travel",
    "#Recipes",
    "#Project",
    "#Journal",
    "#Books",
    "#Contacts",
    "#Events",
    "#Goals",
    "#Research",
  ];

  const formDataSend = (e) => {
    e.preventDefault();

    // assiging TAg Array

    // myCOntextIns.setUserDetails((prevData) => ({
    //   ...prevData,
    //   tags: myTags,
    // }));

    const allFormData = {
      TitleTxt,
      CheckboxTxt,
      selectedTag,
      closeWindow: false,
    };

    accessFormData(allFormData);
  };

  const doCLoseWindow = () => {
    closeWindowFun({ doClose: false });
  };

  const cookieGot = Cookies.get("jsonToken");
  if (cookieGot === undefined) {
    return <Navigate to="/signup" />;
  }

  return (
    <div className="NoteParent">
      <div className="closeDIvParent">
        <ImCross
          size={20}
          className="closeWind"
          color="white"
          onClick={doCLoseWindow}
        />
      </div>

      <div className="toDoFLexAllContent">
        {/* -------------tags */}
        <div className="NoteTagsDiv">
          <div className="NotetagSection">
            {myTags.map((mapTag) => (
              <button
                className="tagCL"
                key={mapTag}
                onClick={() => {
                  setSelectedTag((prevData) => [...prevData, mapTag]);
                }}
              >
                {mapTag}
              </button>
            ))}
          </div>

          <div className="lineDIv"></div>

          <div className="selectedTagDIv">
            {selectedTag.length > 0 &&
              selectedTag.map((mapProp) => (
                <div className="VisibleTagSection">
                  <div className="crossDiv">
                    <ImCross
                      key={mapProp}
                      color="white"
                      size={10}
                      className="crossBtn"
                      onClick={() => {
                        setSelectedTag((prevData) =>
                          prevData.filter(
                            (filterData) => filterData !== mapProp
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="myTag" key={mapProp}>
                    {mapProp}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/*----------------------------------- forms */}

        <div className="formDiv">
          <form onSubmit={formDataSend}>
            <input
              type="text"
              placeholder="Enter your Title"
              value={TitleTxt}
              onChange={(e) => {
                titleAddFun(e.target.value);
              }}
              className="titleTag"
              required
            />
            <br />
            <textarea
              required
              name="note"
              rows="10"
              cols="50"
              placeholder="Write your note here..."
              value={CheckboxTxt}
              className="textAreaCL"
              onChange={(e) => {
                checkboxAddFun(e.target.value);
              }}
            ></textarea>
            <br />
            <div className="btnDiv">
              <button type="submit">Add Note</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteComp;
