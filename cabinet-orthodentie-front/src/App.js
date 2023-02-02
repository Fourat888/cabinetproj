import "./App.css";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as React from "react";
import  { Suspense,useEffect,useState } from "react";

import Menu from "./components/sideBare/Menu";
import LandingPage from "./components/landingPage/LandingPage";
import Signup from "./components/Loginsignup/Signup";
function App() {
  const [test, settest] = React.useState(false);
console.log(localStorage.getItem('token'))
 useEffect( () => {
if (localStorage.getItem('token'))
{
  settest(true)
}
else 
settest(false)
 },[localStorage.getItem('token')])
  return (
    <div className="App">
      {!test ? (
        <Router>
          <Routes>
            <Route path="/" caseSensitive={false} element={<LandingPage />} />
            <Route path="/signup" caseSensitive={false} element={<Signup />} />
            <Route path="/login" caseSensitive={false} element={<Login />} />
          </Routes>
        </Router>
      ) : (
        <Menu></Menu>
      )}
    </div>
  );
}

export default App;
