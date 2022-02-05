const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "medicalapp",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
///////////////////////////////////////////////////////handling login
app.post("/api/insertLogin", (req, res) => {
  const email1 = req.body.email;
  const password1 = req.body.password;
  db.query(
    "SELECT * FROM clients WHERE email=? AND password=?",
    [email1, password1],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "incorrect email or password" });
      }
    }
  );
});
////////////////////////////////////////////////////handling resgiter
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT email FROM clients";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
app.post("/api/insert", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const date = req.body.password;
  const sqlInsert =
    "INSERT INTO clients (username,email,password) VALUES (?,?,?)";
  db.query(sqlInsert, [username, email, password], (err, result) => {
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("heeeey");
});
//////////////////////////////////////////////handling appointments
app.post("/api/insertAppointment", (req, res) => {
  const username = req.body.username;
  const date = req.body.date;
  const time = req.body.time;
  const doctor = req.body.doctor;
  const tel = req.body.tel;
  const sqlSelect = "SELECT id FROM clients WHERE username=?";
  db.query(sqlSelect, [doctor], (err, result) => {
    if (result) {
      let doctor_id = Object.values(JSON.parse(JSON.stringify(result)));

      const sqlInsert =
        "INSERT INTO appointments (user_id,doctor_id,mobile,date,clock) VALUES (?,?,?,?,?)";
      db.query(
        sqlInsert,
        [username, doctor_id[0].id, tel, date, time],
        (err, result) => {
          console.log(err);
        }
      );
    }
  });
});
/////////////////////////////////////////sending data to doctor side
app.post("/api/insertAllAppointments", (req, res) => {
  const username = req.body.username;
  const sqlSelect = "SELECT * FROM appointments WHERE doctor_id=?";
  db.query(sqlSelect, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "incorrect email or password" });
    }
  });
});
////////////////////////////////////////////reject
app.delete("/api/reject/:id", (req, res) => {
  const id = req.params.id;

  const sqlReject = "DELETE FROM appointments WHERE id=?";
  db.query(sqlReject, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
////////////////////////////////////////update status
app.put("/api/update", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;

  const sqlUpdate = "UPDATE appointments SET status=? WHERE id=?";
  db.query(sqlUpdate, [status, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
