import Login from "../component/Login";
import "./Home.css";

const Home = () => {
  return (
    <div className="login-page">
      <div className="login-img"></div>
      <div className="login-container">
        <Login />
      </div>
    </div>
  );
};

export default Home;
