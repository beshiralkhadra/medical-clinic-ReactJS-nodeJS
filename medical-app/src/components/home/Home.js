import React, { useState } from "react";
import { withRouter } from "react-router";
import Axios from "axios";
import data from "./Data";
import Cards from "./Cards";
import "./home.css";
const Home = ({ history }) => {
  console.log(sessionStorage.getItem("loggedId"));

  const [userInfo, setUserInfo] = useState({
    date: "",
    time: "",
    doctor: "",
    tel: "",
  });
  let userId = sessionStorage.getItem("loggedId");
  let userLogged = sessionStorage.getItem("loggedUsername");
  let emailLogged = sessionStorage.getItem("loggedEmail");
  //////////////////handle input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  ///////////////////////////////// handling dates
  let d = new Date();
  let tdate = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getUTCFullYear();
  if (tdate < 10) {
    tdate = "0" + tdate;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let minDate = year + "-" + month + "-" + tdate;
  ///////////////////////////////////handle on submit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(userInfo.tel);
    Axios.post("http://localhost:3001/api/insertAppointment", {
      username: userId,
      date: userInfo.date,
      time: userInfo.time,
      doctor: userInfo.doctor,
      tel: userInfo.tel,
    }).then(() => {});
    alert("your appointment had been sent ,please wait until it accepted");
    history.push({
      pathname: `/login`,
    });
  };
  return (
    <div>
      <div className="back-to-top"></div>

      <div
        className="page-hero bg-image overlay-dark"
        style={{ backgroundImage: `url(../assets/img/bg_image_1.jpg)` }}
      >
        <div className="hero-section">
          <div className="container text-center wow zoomIn">
            <span className="subhead">Let's make your life happier</span>
            <h1 className="display-4">Healthy Living</h1>
            <a href="#" className="btn btn-primary">
              Let's Consult
            </a>
          </div>
        </div>
      </div>

      <div className="bg-light">
        <div className="page-section py-3 mt-md-n5 custom-index">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-secondary text-white">
                    <span className="mai-chatbubbles-outline"></span>
                  </div>
                  <p>
                    <span>Chat</span> with a doctors
                  </p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-primary text-white">
                    <span className="mai-shield-checkmark"></span>
                  </div>
                  <p>
                    <span>One</span>-Health Protection
                  </p>
                </div>
              </div>
              <div className="col-md-4 py-3 py-md-0">
                <div className="card-service wow fadeInUp">
                  <div className="circle-shape bg-accent text-white">
                    <span className="mai-basket"></span>
                  </div>
                  <p>
                    <span>One</span>-Health Pharmacy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="page-section pb-0">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 py-3 wow fadeInUp">
                <h1>
                  Welcome to Your Health <br /> Center
                </h1>
                <p className="text-grey mb-4">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Accusantium aperiam earum ipsa
                  eius, inventore nemo labore eaque porro consequatur ex
                  aspernatur. Explicabo, excepturi accusantium! Placeat
                  voluptates esse ut optio facilis!
                </p>
                <a href="about.html" className="btn btn-primary">
                  Learn More
                </a>
              </div>
              <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                <div className="img-place custom-img-1">
                  <img src="../img/bg-doctor.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/////////////////////////////////////////////////// listing our doctors  */}
      <div className="home-explore">
        <h3> OUR DOCTORS</h3>
        <div className="home-doctors">
          {data.map((item, id) => (
            <Cards src={item.src} des={item.des} key={id} title={item.title} />
          ))}
        </div>
      </div>
      {/*///////////////////////////////////////////////////////// Appointment section  */}
      <div className="page-section">
        <div className="container">
          <h1 className="text-center wow fadeInUp">Make an Appointment</h1>

          <form className="main-form" onSubmit={handleOnSubmit}>
            <div className="row mt-5 ">
              <div className="col-12 col-sm-6 py-2 wow fadeInLeft">
                <input
                  type="text"
                  className="form-control"
                  value={userLogged}
                  disabled
                />
              </div>
              <div className="col-12 col-sm-6 py-2 wow fadeInRight">
                <input
                  type="email"
                  className="form-control"
                  value={emailLogged}
                  disabled
                />
              </div>
              <div
                className="col-12 col-sm-6 py-2 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  min={minDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div
                className="col-12 col-sm-12 py-2 wow fadeInRight"
                data-wow-delay="300ms"
              >
                <select
                  name="time"
                  id="timeId"
                  onChange={handleInputChange}
                  className="custom-select"
                  value={userInfo.time}
                >
                  <option value="">choose time...</option>
                  <option value="8-8:30 am">8-8:30 am</option>
                  <option value="12-12:30 pm">12-12:30 pm</option>
                  <option value="3-3:30 pm">3-3:30 pm</option>
                </select>
              </div>
              <div
                className="col-12 col-sm-12 py-2 wow fadeInRight"
                data-wow-delay="300ms"
              >
                <select
                  name="doctor"
                  id="doctorId"
                  className="custom-select"
                  onChange={handleInputChange}
                  value={userInfo.doctor}
                >
                  <option value="">choose...</option>
                  <option value="Dr.Alexa">Dr.Alexa</option>
                  <option value="Dr.John">Dr.John</option>
                  <option value="Dr.Rebecca">Dr.Rebecca</option>
                </select>
              </div>
              <div className="col-12 py-2 wow fadeInUp" data-wow-delay="300ms">
                <input
                  className="form-control"
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  placeholder="Mobile Number"
                  name="tel"
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 py-2 wow fadeInUp" data-wow-delay="300ms">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows="6"
                  placeholder="Enter message.."
                ></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3 wow zoomIn">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Home);
