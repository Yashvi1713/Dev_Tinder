import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {addUser} from '../utils/userSlice';
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true } // this attribute is important as it allows us to send req from unsecured network backend and it's send in backend as well
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      navigate('/feed');
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-40">
        <div className="card bg-primary-content w-96">
          <div className="card-body">
            <h2 className="card-title ">Login</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="text"
                  className="input"
                  value={emailId}
                  placeholder="Enter email here"
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                />

                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter password here"
                />
              </fieldset>
            </div>
            <div><p className="text-red-500">{error}</p></div>
            <div className="card-actions justify-center">
              <button className="btn bg-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
