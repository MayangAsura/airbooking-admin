import "./login.scss";
import { useState, useContext } from "react";
import { useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { PROD_URL } from "../../api/production";
import { LOCAL_URL } from "../../api/local";

const BASE_URL = process.env.SERVER_MODE === 'production'? PROD_URL : LOCAL_URL

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handledClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post( `${BASE_URL}/auth/login`, credentials);
      // const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate('/')
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="*****"
          id="password"
          onChange={handleChange}
          className="lInput"
        />

        <button onClick={handledClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message} </span>}
      </div>
    </div>
  );
};

export default Login
