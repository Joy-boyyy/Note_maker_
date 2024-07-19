import {
  Link,
  useNavigate,
  // Navigate
} from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { ContextApiCreate } from "../../contextApi/ContextApi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [errVar, setErr] = useState("");
  const navigate = useNavigate();

  const myCOntextIns = useContext(ContextApiCreate);
  console.log("context=>", myCOntextIns);

  const letSetCookie = ({ jsonToken, message }) => {
    Cookies.set("jsonToken", jsonToken, { expires: 1 });
    // console.log(message);
    toast.success(message, { position: "bottom-center" });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const formLoginFun = async (e) => {
    e.preventDefault();

    const signinData = {
      email,
      password,
    };

    //------------------------- setting email id in context
    const chekCookie = Cookies.get("myUniqueEmail");
    if (chekCookie === undefined) {
      Cookies.set("myUniqueEmail", email, { expires: 1 });
    } else {
      Cookies.remove("myUniqueEmail");
      Cookies.set("myUniqueEmail", email, { expires: 1 });
    }

    myCOntextIns.setUserDetails((prevdata) => ({
      ...prevdata,
      email: signinData.email,
    }));

    try {
      const axiosRes = await axios.post(
        "http://localhost:8000/login",
        signinData
      );
      setErr("");
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

  //----- navigating to sign up in case JWT is not stored

  // const jwtTokenGot = Cookies.get("jsonToken");

  // if (jwtTokenGot === undefined) {
  //   return <Navigate to="/signup" />;
  // }

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
          <form className="formTag" onSubmit={formLoginFun}>
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
              <button type="submit">Sign-in</button>
            </div>
            {/*---------------------------- error message */}
            {errVar && (
              <div className="errDIvFUn">
                <p>{errVar}</p>
              </div>
            )}
          </form>
        </div>

        <div className="divLine"></div>
        <div className="paraGraphDiv">
          <p className="linkPara">
            Carete account? <Link to="/signup"> Sign-up </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
