import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [typePassword, setTypePassword] = useState("text");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8000/api/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userInfo),
    });

    const jsonData = await response.json();

    if (jsonData.status === "success") {
      Cookies.set("token", jsonData.payload);
      navigate("/map");
    }
  };

  const handleChange = (e) => {
    setUserInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    setTypePassword(typePassword === "text" ? "password" : "text");
  };

  return (
    <div className="login-container-inner">
      <header className="login-title">
        <div className="login-lock"></div>
        <h2>Login</h2>
      </header>
      <div className="login-input">
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
          <div className="password-container">
            <input
              type={typePassword}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <i className="fa-solid fa-eye" id="eye" onClick={handleClick}></i>
          </div>
          <button>SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
