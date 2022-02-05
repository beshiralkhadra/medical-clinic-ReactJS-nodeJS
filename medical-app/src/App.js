import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import Seller from "./components/seller/Seller";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/registration/Register";
import Footer from "./components/footer/Footer";
import Login from "./components/registration/Login";

function App() {
  const [logged, setLogged] = useState(false);
  const [userSignupInformation, setUserSignupInformation] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [userLoginInformation, setUserLoginInformation] = useState({
    loginEmail: "",
    loginPassword: "",
  });
  return (
    <Router>
      <Navbar setLogged={setLogged} logged={logged} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/seller">
          <Seller />
        </Route>
        <Route exact path="/register">
          <Register
            userSignupInformation={userSignupInformation}
            setUserSignupInformation={setUserSignupInformation}
          />
        </Route>
        <Route exact path="/login">
          <Login
            userLoginInformation={userLoginInformation}
            setUserLoginInformation={setUserLoginInformation}
            setLogged={setLogged}
            logged={logged}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
