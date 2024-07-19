import "./index.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="parentDiv">
      <div className="notFoundChild">
        <div className="backArrowCL">
          <IoArrowBackOutline
            color="white"
            className="backBtnOk"
            size={30}
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
        <img
          src="https://img.freepik.com/free-vector/404-error-webpage-design_23-2147735304.jpg?size=626&ext=jpg&ga=GA1.1.866986062.1686309991&semt=ais_user"
          alt="notFound"
          className="noTFOund"
        />
      </div>
    </div>
  );
};

export default NotFound;
