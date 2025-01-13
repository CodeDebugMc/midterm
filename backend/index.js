const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earist",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected successfully.");
});

// Register user
app.post("/voluntary-work", (req, res) => {
  const {
    nameAndAddress,
    dateFrom,
    dateTo,
    numberOfHours,
    numberOfWorks,
    titleOfProgram,
    dateFromLearningAndDevelopment,
    dateToLearningAndDevelopment,
    numberOfHoursLearningAndDevelopment,
    typeOfLearningDevelopment,
    conductedSponsored,
  } = req.body;

  const query =
    "INSERT INTO voluntary_work (nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks],

    (err, result) => {
      if (err) return res.status(500).send(err);

      const personId = result.insertId;

      const query =
        "INSERT INTO learning_and_development_table (person_id, titleOfProgram, dateFrom, dateTo, numberOfHours, typeOfLearningDevelopment, conductedSponsored) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [
          personId,
          titleOfProgram,
          dateFromLearningAndDevelopment,
          dateToLearningAndDevelopment,
          numberOfHoursLearningAndDevelopment,
          typeOfLearningDevelopment,
          conductedSponsored,
        ],
        (err) => {
          if (err) return res.status(500).send(err);
          res.status(201).send({ message: "User registered successfully" });
        }
      );

      res
        .status(201)
        .send({ message: "Voluntary work created", id: result.insertId });
    }
  );
});

// Login user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send("User not found");

      const user = result[0];
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) return res.status(401).send("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, "your_secret_key", {
        expiresIn: "1h",
      });
      res.status(200).json({ token, userId: user.id }); // Return token and userId
    }
  );
});

// Fetch user profile
app.get("/profile/:id", (req, res) => {
  const userId = req.params.id;
  console.log("Fetching profile for user ID:", userId); // Debugging

  const query =
    "SELECT users.username, employee_profile.fname, employee_profile.lname, employee_profile.email FROM users JOIN employee_profile ON users.id = employee_profile.user_id WHERE users.id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching profile:", err);
      return res.status(500).send("Error fetching profile");
    }
    if (result.length === 0) return res.status(404).send("Profile not found");
    console.log("Profile data:", result[0]); // Check if data is being returned
    res.status(200).json(result[0]);
  });
});

// Update user and profile
app.put("/voluntary-work/:id", (req, res) => {
  const personId = req.params.id;
  const {
    nameAndAddress,
    dateFrom,
    dateTo,
    numberOfHours,
    numberOfWorks,
    titleOfProgram,
    dateFromLearningAndDevelopment,
    dateToLearningAndDevelopment,
    numberOfHoursLearningAndDevelopment,
    typeOfLearningDevelopment,
    conductedSponsored,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE voluntary_work SET nameAndAddress = ?, dateFrom = ?, dateTo = ?, numberOfHours = ?, numberOfWorks = ? WHERE id = ?";
  db.query(
    query,
    [nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks, id],
    (err) => {
      if (err) {
        console.error(
          "Error updating voluntary & learning_and_development_table:",
          err
        );

        return res.status(500).send(err);
      }

      const query =
        "UPDATE learning_and_development_table SET titleOfProgram = ?, dateFromLearningAndDevelopment = ?, dateToLearningAndDevelopment = ?, numberOfHoursLearningAndDevelopment = ?, typeOfLearningDevelopment = ?, conductedSponsored = ? WHERE person_id = ?";
      db.query(
        query,
        [
          titleOfProgram,
          dateFromLearningAndDevelopment,
          dateToLearningAndDevelopment,
          numberOfHoursLearningAndDevelopment,
          typeOfLearningDevelopment,
          conductedSponsored,
          personId,
        ],
        (err) => {
          if (err) {
            console.error(
              "Error updating learning_and_development_table:",
              err
            );
            return res.status(500).send(err);
          }
          res.status(200).send({ message: "Learning and Development updated" });
        }
      );
    }
  );
});

// Delete user and profile
app.delete("/voluntary-work/:id", (req, res) => {
  const personId = req.params.id;
  const query = "DELETE FROM voluntary_work WHERE id = ?";
  db.query(query, [personId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Voluntary work deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
