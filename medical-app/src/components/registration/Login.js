import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Axios from "axios";
const Login = ({
  userLoginInformation,
  setUserLoginInformation,
  history,
  setLogged,
}) => {
  // const [sqlLoggedUser, setSqlLoggedUser] = useState([]);
  const handleonChange = (e) => {
    const { name, value } = e.target;

    setUserLoginInformation({
      ...userLoginInformation,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/insertLogin", {
      email: userLoginInformation.email,
      password: userLoginInformation.password,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else if (response.data[0].role == 0) {
        setLogged(true);
        sessionStorage.setItem("loggedId", response.data[0].id);
        sessionStorage.setItem("loggedUsername", response.data[0].username);
        sessionStorage.setItem("loggedEmail", response.data[0].email);
        history.push({
          pathname: `/`,
        });
      } else {
        setLogged(true);
        sessionStorage.setItem("loggedId", response.data[0].id);
        sessionStorage.setItem("loggedUsername", response.data[0].username);
        sessionStorage.setItem("loggedEmail", response.data[0].email);
        // Axios.post("http://localhost:3001/api/insertAllAppointments", {
        //   username: sessionStorage.getItem("loggedId"),
        //   // email: userSignupInformation.email,
        //   // password: userSignupInformation.password,
        // }).then(() => {});
        history.push({
          pathname: `/seller`,
        });
      }
    });
  };
  return (
    <div>
      <div className="page-section">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Login</h1>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="row mt-5 ">
              <div className="col-12 col-sm-12 py-2 wow fadeInRight">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address.."
                  name="email"
                  onChange={handleonChange}
                  required
                />
              </div>

              <div
                className="col-12 col-sm-12 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                  onChange={handleonChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
              Login
            </button>
            <br />
            <Link to="/login">Already have an account</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);
