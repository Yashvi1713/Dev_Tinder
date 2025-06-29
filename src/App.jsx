import NavBar from "./components/NavBar"; //ES6 module import format
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}> 
            <Route path="/login" element={<Login/>}></Route> 
            <Route path="/feed" element={<Feed/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
          <Route path='/error' element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
{/*child routes to maintain structure */}