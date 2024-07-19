import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
// import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextApiCreate } from "../../contextApi/ContextApi";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errVar, setErr] = useState("");
  const navigate = useNavigate();

  //-----------------------context
  const myCOntextIns = useContext(ContextApiCreate);

  const letSetCookie = ({ jsonToken, message }) => {
    Cookies.set("jsonToken", jsonToken, { expires: 1 });
    // console.log(message);
    toast.success(message, { position: "bottom-center" });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const formSubmitFun = async (e) => {
    e.preventDefault();

    const signUpData = {
      _id: email,
      username,
      email,
      password,
    };

    //------------------------- setting email id and username in context
    // myCOntextIns.setUserDetails({
    //   email: signUpData.email,
    //   username: signUpData.username,
    // });

    myCOntextIns.setUserDetails((prevData) => ({
      ...prevData,
      email: signUpData.email,
    }));

    const chekCookie = Cookies.get("myUniqueEmail");

    if (chekCookie === undefined) {
      Cookies.set("myUniqueEmail", email, { expires: 1 });
    } else {
      Cookies.remove("myUniqueEmail");
      Cookies.set("myUniqueEmail", email, { expires: 1 });
    }

    try {
      const axiosRes = await axios.post(
        "http://localhost:8000/signup",
        signUpData
      );

      setErr("");
      console.log(axiosRes);

      if (axiosRes.statusText === "OK") {
        letSetCookie(axiosRes.data);
      }
    } catch (error) {
      if (error.response) {
        setErr(error.response.data.message);
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      } else {
        setErr(error.message);
        toast.error(error.message, {
          position: "bottom-center",
        });
      }
    }
  };

  //----- navigating to Home in case JWT is stored

  return (
    <div className="SignupParent">
      <ToastContainer position="bottom-center" />
      <div className="SignupFstChild">
        {/* ---------------------logo Div */}
        <div className="webLogoDiv">
          <img
            src="https://www.apsona.com/wp-content/uploads/2023/12/apsona-header-logo.svg"
            alt="apsona-img-logo"
            className="aapsonaLogo"
          />
        </div>

        <div className="formDiv">
          <form className="formTag" onSubmit={formSubmitFun}>
            <input
              type="text"
              placeholder="Enter you name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
            <div className="btnDiv">
              <button type="submit">Sign-up</button>
            </div>
          </form>
        </div>
        {/*---------------------------- error message */}
        {errVar && (
          <div className="errDIvFUn">
            <p>{errVar}</p>
          </div>
        )}

        <div className="divLine"></div>
        <div className="paraGraphDiv">
          <p className="linkPara">
            Already have an account? <Link to="/signin"> Sign-in </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
