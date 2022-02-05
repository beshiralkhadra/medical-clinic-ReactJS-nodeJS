import React, { useEffect, useState } from "react";
import "./seller.css";
import Axios from "axios";
const Seller = () => {
  const [getAppointmentsDetails, setGetAppointmentsDetails] = useState([]);
  const [newState, setNewState] = useState(0);
  ////////////////////////////////getting appointments from database
  useEffect(() => {
    Axios.post("http://localhost:3001/api/insertAllAppointments", {
      username: sessionStorage.getItem("loggedId"),
    }).then((response) => {
      if (response) {
        setGetAppointmentsDetails(response.data);
      }
    });
  }, []);
  const rejected = (id) => {
    Axios.delete(`http://localhost:3001/api/reject/${id}`).then((response) => {
      setGetAppointmentsDetails(
        getAppointmentsDetails.filter((appoi) => {
          return appoi.id == id;
        })
      );
    });
  };
  // console.log(getAppointmentsDetails[0].status);
  const accepted = (id) => {
    Axios.put("http://localhost:3001/api/update", {
      status: newState,
      id: id,
    }).then((response) => {
      setGetAppointmentsDetails(
        getAppointmentsDetails.map((appoi) => {
          return appoi.id == id
            ? {
                id: appoi.id,
                user_id: appoi.user_id,
                mobile: appoi.mobile,
                date: appoi.date,
                clock: appoi.clock,
                status: newState,
              }
            : appoi;
        })
      );
    });
  };

  return (
    <div>
      <h1 className="text-center p-3 m-3">
        Your <span style={{ color: "#00D9A5" }}>Appointments</span>
      </h1>

      <div className="container my-3">
        <table className="table">
          <thead style={{ backgroundColor: "#00D9A5" }}>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Patient name</th>
              <th scope="col">Number</th>
              <th scope="col">Preferred date</th>
              <th scope="col">Clock</th>
              <th scope="col">Status</th>
              <th scope="col">Accept</th>
              <th scope="col">Reject</th>
            </tr>
          </thead>
          <tbody>
            {getAppointmentsDetails.map((item, id) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.user_id}</td>
                <td>{item.mobile}</td>
                <td>{item.date}</td>
                <td>{item.clock}</td>
                <td>{item.status}</td>
                <td>
                  <div>
                    <input
                      placeholder="1"
                      type="text"
                      min="0"
                      max="1"
                      onChange={(e) => setNewState(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      accepted(item.id);
                    }}
                  >
                    Accepted
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      rejected(item.id);
                    }}
                  >
                    Rejected
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seller;
