import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const url = "http://localhost:8000/api/logout";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </>
  );
};

export default Logout;
