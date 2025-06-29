import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);

  // Fetching the user from the api call made and then dispatching it to the appstore using useDispatch() method
  const fetchUser = async () => {
    try {
      if(userData)return;
      // provide info of loggedIn user
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      // handling authentication related error or any other errors that might occur
      if (err.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
      console.log(err);
    }
  };

  // useEffect() invoke anything inside it on first render of the component
  // This will ensure that on first render of the page the loggedIn user is being fetched by calling /profile/view this will able to give the user only if user loggedIn bcz in backend it gets the user from the userAuth which uthenticate based on token which can only be generated if user is loggedIn and further it sends it with req and profile api can show it
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      {/* Used to invoke all the child routes defined in the main app file*/}
      <Footer />
    </>
  );
};

export default Body;
