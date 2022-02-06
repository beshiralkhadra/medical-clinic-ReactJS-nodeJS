import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Axios from "axios";

const Register = ({
  userSignupInformation,
  setUserSignupInformation,
  history,
}) => {
  const [sqlEmails, setSqlEmails] = useState([]);
  const handleonChange = (e) => {
    const { name, value } = e.target;

    setUserSignupInformation({
      ...userSignupInformation,
      [name]: value,
    });
  };
  ////////////////////////////////////////getting emails from database
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setSqlEmails(response.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, repeatPassword } = e.target;
    /////////////////////////////////////////////////// check if email exist
    let checkEmail = sqlEmails.some(
      (v) => v.email === userSignupInformation.email
    );
    //////////////////////////////////////////////////// checking on validation
    if (
      checkEmail ||
      password.value !== repeatPassword.value ||
      password.value < 8
    ) {
      alert("please check your information");
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        username: userSignupInformation.username,
        email: userSignupInformation.email,
        password: userSignupInformation.password,
      }).then(() => {});
      history.push({
        pathname: `/login`,
      });
    }
  };
  return (
    <div>
      <div className="page-section">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Register</h1>

          <form className="main-form" onSubmit={handleSubmit}>
            <div className="row mt-5 ">
              <div className="col-12 col-sm-12 py-2 wow fadeInLeft">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  name="username"
                  onChange={handleonChange}
                  required
                />
              </div>
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
              {userSignupInformation.email === "" ? (
                <span style={{ color: "red" }}>please enter your email </span>
              ) : null}
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
              {userSignupInformation.password.length < 8 &&
              userSignupInformation.password === "" ? (
                <span style={{ color: "red" }}>Please enter your password</span>
              ) : null}
              <div
                className="col-12 col-sm-12 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <input
                  type="password"
                  className="form-control"
                  placeholder="repeat password"
                  name="repeatPassword"
                  onChange={handleonChange}
                />
              </div>
              {userSignupInformation.repeatPassword !==
              userSignupInformation.password ? (
                <span style={{ color: "red" }}>not match </span>
              ) : null}
            </div>
            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
              Submit Request
            </button>
            <br />
            Already have an account? <Link to="/login"> Signin</Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Register);
