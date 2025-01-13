const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs"); // Import file system module

const mysql = require("mysql2"); // install this on the node modules of the front end

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");
const moment = require("moment");
const pageRoutes = require('./pageRoutes'); // Path for the Routes 


const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve logo images
app.use('/api', pageRoutes); // Use the page routes under /api

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "earistt",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database Connected");
});

// File upload config
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//======================
// COMPANY SETTINGS START
// =====================

// Get company settings
app.get("/api/settings", (req, res) => {
  db.query("SELECT * FROM company_settings WHERE id = 1", (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Helper function to delete old logo
const deleteOldLogo = (logoUrl) => {
  if (!logoUrl) return; // If no logo URL, exit early

  const logoPath = path.join(__dirname, logoUrl); // Construct the full path to the logo file
  fs.unlink(logoPath, (err) => {
    if (err) {
      console.error(`Error deleting old logo at ${logoPath}: ${err}`);
    } else {
      console.log(`Previous logo at ${logoPath} deleted successfully.`);
    }
  });
};

//======================
// COMPANY SETTINGS END
// =====================

// insert here the app for CRUD in the handout
// after pasting the codes, restart the backend server

//=======================
// VERIFY USER START HERE
//=======================
//Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (username, email, password) VALUES (?,?,?)`;

  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "User Registered" });
  });
});





// Login endpoint
// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, users) => {
    if (err || users.length === 0) return res.status(404).send('User not found');
    const user = users[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(401).send('Invalid password');

    // Include userId in the response
    const token = jwt.sign({ id: user.id, accessLevel: user.access_level }, 'secret', { expiresIn: 86400 });
    res.status(200).send({ token, userId: user.id }); // Send userId with token
  });
});


//=======================
// VERIFY USER END HERE
//=======================

//=======================
// CRUD ROUTES START HERE
//=======================
// CRUD routes (e.g., Create, Read, Update, Delete)
// more CRUD routes...

// Voluntary Table Start Here!
// Read (Get All voluntary-work)
app.get("/voluntary-work", (req, res) => {
  const query = "SELECT * FROM voluntary_work";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Create (Add New voluntary-work)
app.post("/voluntary-work", (req, res) => {
  const { nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks } =
    req.body;
  const query =
    "INSERT INTO voluntary_work (nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item voluntary-work
app.put("/voluntary-work/:id", (req, res) => {
  const { nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks } =
    req.body;
  const { id } = req.params;
  const query =
    "UPDATE voluntary_work SET nameAndAddress = ?, dateFrom = ?, dateTo = ?, numberOfHours = ?, numberOfWorks = ? WHERE id = ?";
  db.query(
    query,
    [nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item Voluntary
app.delete("/voluntary-work/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM voluntary_work WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// VOLUNTARY TABLE END HERE.
//=======================
// CRUD ROUTES END HERE
//=======================

// Learning and Development Table Start Here!
// Read all Learning and Development
app.get("/learning-and-development", (req, res) => {
  const query = "SELECT * FROM learning_and_development";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add items for Learning and Development
app.post("/learning-and-development", (req, res) => {
  const {
    titleOfProgram,
    dateFrom,
    dateTo,
    numberOfHours,
    typeOfLearningDevelopment,
    conductedSponsored,
  } = req.body;
  const query =
    "INSERT INTO learning_and_development(titleOfProgram, dateFrom, dateTo, numberOfHours, typeOfLearningDevelopment, conductedSponsored) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      titleOfProgram,
      dateFrom,
      dateTo,
      numberOfHours,
      typeOfLearningDevelopment,
      conductedSponsored,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update the learning and development
app.put("/learning-and-development/:id", (req, res) => {
  const {
    titleOfProgram,
    dateFrom,
    dateTo,
    numberOfHours,
    typeOfLearningDevelopment,
    conductedSponsored,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE learning_and_development SET titleOfProgram = ?, dateFrom = ?, dateTo = ?, numberOfHours = ?, typeOfLearningDevelopment = ?, conductedSponsored = ? WHERE id = ?";
  db.query(
    query,
    [
      titleOfProgram,
      dateFrom,
      dateTo,
      numberOfHours,
      typeOfLearningDevelopment,
      conductedSponsored,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete the item for learning and development
app.delete("/learning-and-development/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM learning_and_development WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// LEARNING AND DEVELOPMENT TABLE END HERE.

// ELIGIBILITIY TABLE START HERE!
// Read all Elegibility Table
app.get("/eligibility", (req, res) => {
  const query = "SELECT * FROM eligibility";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item Elegibility Table
app.post("/eligibility", (req, res) => {
  const {
    eligibilityName,
    eligibilityRating,
    eligibilityDateOfExam,
    licenseNumber,
    dateOfValidity,
  } = req.body;
  const query =
    "INSERT INTO eligibility (eligibilityName, eligibilityRating, eligibilityDateOfExam, licenseNumber, dateOfValidity) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      eligibilityName,
      eligibilityRating,
      eligibilityDateOfExam,
      licenseNumber,
      dateOfValidity,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item Elegibility Table
app.put("/eligibility/:id", (req, res) => {
  const {
    eligibilityName,
    eligibilityRating,
    eligibilityDateOfExam,
    licenseNumber,
    dateOfValidity,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE eligibility SET eligibilityName = ?, eligibilityRating = ?, eligibilityDateOfExam = ?, licenseNumber = ?, dateOfValidity = ? WHERE id = ?";
  db.query(
    query,
    [
      eligibilityName,
      eligibilityRating,
      eligibilityDateOfExam,
      licenseNumber,
      dateOfValidity,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item Elegilitiy Table
app.delete("/eligibility/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM eligibility WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// ELIGIBILITY TABLE END HERE.

// Person_Table START HERE!
// app.get("/person-table", (req, res) => {
//   const query = "SELECT * FROM person_table";
//   db.query(query, (err, result) => {
//     if (err) return res.status(500).send(err);
//     res.status(200).send(result);
//   });
// });

// app.post("/person-table", (req, res) => {
//   const {
//     firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived 
//   } = req.body;
//   const query =
//     "INSERT INTO person_table (firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//   db.query(
//     query,
//     [
//       firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived
//     ],
//     (err, result) => {
//       if (err) return res.status(500).send(err);
//       res.status(201).send({ message: "Item created", id: result.insertId });
//     }
//   );
// });


// app.put("/person-table/:id", (req, res) => {
//   const {
//     firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived 
//   } = req.body;
//   const { id } = req.params;
//   const query =
//     "UPDATE person_table SET firstName = ?, middleName = ?, lastName = ?, birthDate = ?, civilStatus = ?, heightM = ?, weightKg = ?, bloodType = ?, gsisNum = ?, pagibigNum = ?, philhealthNum = ?, sssNum = ?, tinNum = ?, agencyEmployeeNum = ?, houseBlockLotNum = ?, streetName = ?, subdivisionOrVillage = ?, barangayName = ?, cityOrMunicipality = ?, provinceName = ?, zipcode = ?, telephone = ?, mobileNum = ?, emailAddress = ?, spouseFirstName = ?, spouseMiddleName = ?, spouseLastName = ?, spouseNameExtension = ?, spouseOccupation = ?, spouseEmployerBusinessName = ?, spouseBusinessAddress = ?, spouseTelephone = ?, fatherFirstName = ?, fatherMiddleName = ?, fatherLastName = ?, fatherNameExtension = ?, motherMaidenFirstName = ?, motherMaidenMiddleName = ?, motherMaidenLastName = ?, elementaryNameOfSchool = ?, elementaryDegree = ?, elementaryPeriodFrom = ?, elementaryPeriodTo = ?, elementaryHighestAttained = ?, elementaryYearGraduated = ?, elementaryScholarshipAcademicHonorsReceived = ?, secondaryNameOfSchool = ?, secondaryDegree = ?, secondaryPeriodFrom = ?, secondaryPeriodTo = ?, secondaryHighestAttained = ?, secondaryYearGraduated = ?, secondaryScholarshipAcademicHonorsReceived = ? WHERE id = ?';
//   db.query(
//     query,
//     [
//       firstName, middleName, lastName, birthDate, civilStatus, heightM, weightKg, bloodType, gsisNum, pagibigNum, philhealthNum, sssNum, tinNum, agencyEmployeeNum, houseBlockLotNum, streetName, subdivisionOrVillage, barangayName, cityOrMunicipality, provinceName, zipcode, telephone, mobileNum, emailAddress, spouseFirstName, spouseMiddleName, spouseLastName, spouseNameExtension, spouseOccupation, spouseEmployerBusinessName, spouseBusinessAddress, spouseTelephone, fatherFirstName, fatherMiddleName, fatherLastName, fatherNameExtension, motherMaidenFirstName, motherMaidenMiddleName, motherMaidenLastName, elementaryNameOfSchool, elementaryDegree, elementaryPeriodFrom, elementaryPeriodTo, elementaryHighestAttained, elementaryYearGraduated, elementaryScholarshipAcademicHonorsReceived, secondaryNameOfSchool, secondaryDegree, secondaryPeriodFrom, secondaryPeriodTo, secondaryHighestAttained, secondaryYearGraduated, secondaryScholarshipAcademicHonorsReceived, id,
//     ],
//     (err, result) => {
//       if (err) return res.status(500).send(err);
//       res.status(200).send({ message: "Item updated" });
//     }
//   );
// });
// COLLEGE TABLE START HERE!
// College Table
app.get("/college", (req, res) => {
  const query = "SELECT * FROM college";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item for college
app.post("/college", (req, res) => {
  const {
    collegeNameOfSchool,
    collegeDegree,
    collegePeriodFrom,
    collegePeriodTo,
    collegeHighestAttained,
    collegeYearGraduated,
    collegeScholarshipAcademicHonorsReceived,
  } = req.body;
  const query =
    "INSERT INTO college (collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      collegeNameOfSchool,
      collegeDegree,
      collegePeriodFrom,
      collegePeriodTo,
      collegeHighestAttained,
      collegeYearGraduated,
      collegeScholarshipAcademicHonorsReceived,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for college
app.put("/college/:id", (req, res) => {
  const {
    collegeNameOfSchool,
    collegeDegree,
    collegePeriodFrom,
    collegePeriodTo,
    collegeHighestAttained,
    collegeYearGraduated,
    collegeScholarshipAcademicHonorsReceived,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE college SET collegeNameOfSchool = ?, collegeDegree = ?, collegePeriodFrom = ?, collegePeriodTo = ?, collegeHighestAttained = ?, collegeYearGraduated = ?, collegeScholarshipAcademicHonorsReceived = ? WHERE id = ?";
  db.query(
    query,
    [
      collegeNameOfSchool,
      collegeDegree,
      collegePeriodFrom,
      collegePeriodTo,
      collegeHighestAttained,
      collegeYearGraduated,
      collegeScholarshipAcademicHonorsReceived,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for college
app.delete("/college/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM college WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// COLLEGE TABLE END HERE.

// OTHER INFORMATION START HERE!
// GET ALL ITEM FROM OTHER INFORMATION
app.get("/other-information", (req, res) => {
  const query = "SELECT * FROM other_information";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item for other-information
app.post("/other-information", (req, res) => {
  const { specialSkills, nonAcademicDistinctions, membershipInAssociation } =
    req.body;
  const query =
    "INSERT INTO other_information (specialSkills, nonAcademicDistinctions, membershipInAssociation) VALUES (?, ?, ?)";
  db.query(
    query,
    [specialSkills, nonAcademicDistinctions, membershipInAssociation],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for other information
app.put("/other-information/:id", (req, res) => {
  const { specialSkills, nonAcademicDistinctions, membershipInAssociation } =
    req.body;
  const { id } = req.params;
  const query =
    "UPDATE other_information SET specialSkills = ?, nonAcademicDistinctions = ?, membershipInAssociation = ? WHERE id = ?";
  db.query(
    query,
    [specialSkills, nonAcademicDistinctions, membershipInAssociation, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for other information
app.delete("/other-information/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM other_information WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// OTHER INFORMATION TABLE END HERE.

// VOCATAIONAL TABLE START HERE!
// Get all item from vocational table
app.get("/vocational", (req, res) => {
  const query = "SELECT * FROM vocational";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item vocational
app.post("/vocational", (req, res) => {
  const {
    vocationalNameOfSchool,
    vocationalDegree,
    vocationalPeriodFrom,
    vocationalPeriodTo,
    vocationalHighestAttained,
    vocationalYearGraduated,
  } = req.body;
  const query =
    "INSERT INTO vocational (vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      vocationalNameOfSchool,
      vocationalDegree,
      vocationalPeriodFrom,
      vocationalPeriodTo,
      vocationalHighestAttained,
      vocationalYearGraduated,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for vocational
app.put("/vocational/:id", (req, res) => {
  const {
    vocationalNameOfSchool,
    vocationalDegree,
    vocationalPeriodFrom,
    vocationalPeriodTo,
    vocationalHighestAttained,
    vocationalYearGraduated,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE vocational SET vocationalNameOfSchool = ?, vocationalDegree = ?, vocationalPeriodFrom = ?, vocationalPeriodTo = ?, vocationalHighestAttained = ?, vocationalYearGraduated = ?  WHERE id = ?";
  db.query(
    query,
    [
      vocationalNameOfSchool,
      vocationalDegree,
      vocationalPeriodFrom,
      vocationalPeriodTo,
      vocationalHighestAttained,
      vocationalYearGraduated,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for vocational
app.delete("/vocational/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM vocational WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// VOCATINAL TABLE END HERE.

// WORK EXPERIENCE TABLE START HERE!
// Get all item for work experience
app.get("/work-experience", (req, res) => {
  const query = "SELECT * FROM work_experience";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item for work experience
app.post("/work-experience", (req, res) => {
  const {
    workDateFrom,
    workDateTo,
    workPositionTitle,
    workCompany,
    workMonthlySalary,
    salaryJobOrPayGrade,
    statusOfAppointment,
    isGovtService,
  } = req.body;
  const query =
    "INSERT INTO work_experience (workDateFrom, workDateTo, workPositionTitle, workCompany, workMonthlySalary, salaryJobOrPayGrade, statusOfAppointment, isGovtService) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      workDateFrom,
      workDateTo,
      workPositionTitle,
      workCompany,
      workMonthlySalary,
      salaryJobOrPayGrade,
      statusOfAppointment,
      isGovtService,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for work experience
app.put("/work-experience/:id", (req, res) => {
  const {
    workDateFrom,
    workDateTo,
    workPositionTitle,
    workCompany,
    workMonthlySalary,
    salaryJobOrPayGrade,
    statusOfAppointment,
    isGovtService,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE work_experience SET workDateFrom = ?, workDateTo = ?, workPositionTitle = ?, workCompany = ?, workMonthlySalary = ?, salaryJobOrPayGrade = ?, statusOfAppointment = ?, isGovtService = ?  WHERE id = ?";
  db.query(
    query,
    [
      workDateFrom,
      workDateTo,
      workPositionTitle,
      workCompany,
      workMonthlySalary,
      salaryJobOrPayGrade,
      statusOfAppointment,
      isGovtService,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for work experience
app.delete("/work-experience/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM work_experience WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// WORK EXPERIENCE END HERE.

// CITIZENSHIP TABLE START HERE!
// Get all item from citizenship
app.get("/citizenship", (req, res) => {
  const query = "SELECT * FROM citizenship";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item for citizenship
app.post("/citizenship", (req, res) => {
  const { citizenshipDescription, citizenshipType, countryName } = req.body;
  const query =
    "INSERT INTO citizenship (citizenshipDescription, citizenshipType, countryName) VALUES (?, ?, ?)";
  db.query(
    query,
    [citizenshipDescription, citizenshipType, countryName],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for citizenship
app.put("/citizenship/:id", (req, res) => {
  const { citizenshipDescription, citizenshipType, countryName } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE citizenship SET citizenshipDescription = ?, citizenshipType = ?, countryName = ? WHERE id = ?";
  db.query(
    query,
    [citizenshipDescription, citizenshipType, countryName, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for citizenship
app.delete("/citizenship/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM citizenship WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});
// CITIZENSHIP TABLE END HERE.

// CHILDREN TABLE START HERE!
// Get all item for children
app.get("/children", (req, res) => {
  const query = "SELECT * FROM children";
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
});

// Add item for children
app.post("/children", (req, res) => {
  const {
    childrenFirstName,
    childrenLastName,
    childrenNameExtension,
    dateOfBirth,
  } = req.body;
  const query =
    "INSERT INTO children (childrenFirstName, childrenLastName, childrenNameExtension, dateOfBirth) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [childrenFirstName, childrenLastName, childrenNameExtension, dateOfBirth],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send({ message: "Item created", id: result.insertId });
    }
  );
});

// Update item for children
app.put("/children/:id", (req, res) => {
  const {
    childrenFirstName,
    childrenLastName,
    childrenNameExtension,
    dateOfBirth,
  } = req.body;
  const { id } = req.params;
  const query =
    "UPDATE children SET childrenFirstName = ?, childrenLastName = ?, childrenNameExtension = ?, dateOfBirth = ?  WHERE id = ?";
  db.query(
    query,
    [
      childrenFirstName,
      childrenLastName,
      childrenNameExtension,
      dateOfBirth,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Item updated" });
    }
  );
});

// Delete item for children
app.delete("/children/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM children WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Item deleted" });
  });
});

// Update company settings
app.post("/api/settings", upload.single("logo"), (req, res) => {
  const companyName = req.body.company_name || "";
  const headerColor = req.body.header_color || "#ffffff";
  const footerText = req.body.footer_text || "";
  const footerColor = req.body.footer_color || "#ffffff";
  const logoUrl = req.file ? `/uploads/${req.file.filename}` : null;

  // Check if company settings already exist
  db.query("SELECT * FROM company_settings WHERE id = 1", (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // Existing settings found

      const oldLogoUrl = result[0].logo_url; // Save old logo URL for deletion

      // Update existing settings
      const query =
        "UPDATE company_settings SET company_name = ?, header_color = ?, footer_text = ?, footer_color = ?" +
        (logoUrl ? ", logo_url = ?" : "") +
        " WHERE id = 1";
      const params = [companyName, headerColor, footerText, footerColor];
      if (logoUrl) params.push(logoUrl);

      db.query(query, params, (err) => {
        if (err) throw err;

        // If there's a new logo, delete the old one
        if (logoUrl && oldLogoUrl) {
          deleteOldLogo(oldLogoUrl);
        }

        res.send({ success: true });
      });
    } else {
      // Insert new settings
      const query =
        "INSERT INTO company_settings (company_name, header_color, footer_text, footer_color, logo_url) VALUES (?, ?, ?, ?, ?)";
      db.query(
        query,
        [companyName, headerColor, footerText, footerColor, logoUrl],
        (err) => {
          if (err) throw err;
          res.send({ success: true });
        }
      );
    }
  });
});

//=========================
// UPLOAD XLSX START HERE
//=========================

// Multer setup for file uploads
const uploads = multer({ dest: "uploads/" });

// Function to convert Excel date serial to JS Date
const excelDateToJSDate = (serial) => {
  // Excel stores dates as days since 1900-01-01
  const startDate = new Date(1900, 0, 1);
  const resultDate = new Date(
    startDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000
  );
  return resultDate;
};

// Route to handle XLS file upload
app.post("/upload/voluntary-work", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const { nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks } =
        row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
        INSERT INTO voluntary_work (nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks) 
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [nameAndAddress, dateFrom, dateTo, numberOfHours, numberOfWorks],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post(
  "/upload/learning-and-development",
  uploads.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      // Read the uploaded XLS file
      const workbook = xlsx.readFile(req.file.path);
      const sheet_name = workbook.SheetNames[0];
      const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

      // Log the uploaded data for troubleshooting
      console.log("Uploaded sheet data:", sheet);

      // Insert data into 'voluntary-work' table
      sheet.forEach((row) => {
        const {
          titleOfProgram,
          dateFrom,
          dateTo,
          numberOfHours,
          typeOfLearningDevelopment,
          conductedSponsored,
        } = row;

        // Prepare SQL statement for insertion into 'voluntary-work' table
        const sql = `
        INSERT INTO learning_and_development(titleOfProgram, dateFrom, dateTo, numberOfHours, typeOfLearningDevelopment, conductedSponsored) VALUES (?, ?, ?, ?, ?, ?)
      `;
        db.query(
          sql,
          [
            titleOfProgram,
            dateFrom,
            dateTo,
            numberOfHours,
            typeOfLearningDevelopment,
            conductedSponsored,
          ],
          (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);
              return;
            }
            console.log(
              "Data inserted successfully into Voluntary Work table:",
              result
            );
          }
        );
      });

      // Send response after insertion
      res.json({
        message:
          "File uploaded and data inserted successfully into Voluntary Work table",
      });
    } catch (error) {
      console.error("Error processing XLS file:", error);
      res.status(500).json({ error: "Error processing XLS file" });
    } finally {
      // Delete the uploaded file to save space on the server
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting uploaded file:", err);
        } else {
          console.log("Uploaded file deleted");
        }
      });
    }
  }
);

app.post("/upload/eligibility", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        eligibilityName,
        eligibilityRating,
        eligibilityDateOfExam,
        licenseNumber,
        dateOfValidity,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
        INSERT INTO eligibility (eligibilityName, eligibilityRating, eligibilityDateOfExam, licenseNumber, dateOfValidity) VALUES (?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          eligibilityName,
          eligibilityRating,
          eligibilityDateOfExam,
          licenseNumber,
          dateOfValidity,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/college", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        collegeNameOfSchool,
        collegeDegree,
        collegePeriodFrom,
        collegePeriodTo,
        collegeHighestAttained,
        collegeYearGraduated,
        collegeScholarshipAcademicHonorsReceived,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
        INSERT INTO college (collegeNameOfSchool, collegeDegree, collegePeriodFrom, collegePeriodTo, collegeHighestAttained, collegeYearGraduated, collegeScholarshipAcademicHonorsReceived) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          collegeNameOfSchool,
          collegeDegree,
          collegePeriodFrom,
          collegePeriodTo,
          collegeHighestAttained,
          collegeYearGraduated,
          collegeScholarshipAcademicHonorsReceived,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/other-information", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        specialSkills,
        nonAcademicDistinctions,
        membershipInAssociation,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
        INSERT INTO other_information (specialSkills, nonAcademicDistinctions, membershipInAssociation) VALUES (?, ?, ?)
      `;
      db.query(
        sql,
        [specialSkills, nonAcademicDistinctions, membershipInAssociation],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/vocational", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        vocationalNameOfSchool,
        vocationalDegree,
        vocationalPeriodFrom,
        vocationalPeriodTo,
        vocationalHighestAttained,
        vocationalYearGraduated,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
        INSERT INTO vocational (vocationalNameOfSchool, vocationalDegree, vocationalPeriodFrom, vocationalPeriodTo, vocationalHighestAttained, vocationalYearGraduated) VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          vocationalNameOfSchool,
          vocationalDegree,
          vocationalPeriodFrom,
          vocationalPeriodTo,
          vocationalHighestAttained,
          vocationalYearGraduated,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/work-experience", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        workDateFrom,
        workDateTo,
        workPositionTitle,
        workCompany,
        workMonthlySalary,
        salaryJobOrPayGrade,
        statusOfAppointment,
        isGovtService,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
       INSERT INTO work_experience (workDateFrom, workDateTo, workPositionTitle, workCompany, workMonthlySalary, salaryJobOrPayGrade, statusOfAppointment, isGovtService) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          workDateFrom,
          workDateTo,
          workPositionTitle,
          workCompany,
          workMonthlySalary,
          salaryJobOrPayGrade,
          statusOfAppointment,
          isGovtService,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/citizenship", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const { citizenshipDescription, citizenshipType, countryName } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
       INSERT INTO citizenship (citizenshipDescription, citizenshipType, countryName) VALUES (?, ?, ?)
      `;
      db.query(
        sql,
        [citizenshipDescription, citizenshipType, countryName],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});

app.post("/upload/children", uploads.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Read the uploaded XLS file
    const workbook = xlsx.readFile(req.file.path);
    const sheet_name = workbook.SheetNames[0];
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name]);

    // Log the uploaded data for troubleshooting
    console.log("Uploaded sheet data:", sheet);

    // Insert data into 'voluntary-work' table
    sheet.forEach((row) => {
      const {
        childrenFirstName,
        childrenLastName,
        childrenNameExtension,
        dateOfBirth,
      } = row;

      // Prepare SQL statement for insertion into 'voluntary-work' table
      const sql = `
       INSERT INTO children (childrenFirstName, childrenLastName, childrenNameExtension, dateOfBirth) VALUES (?, ?, ?, ?)
      `;
      db.query(
        sql,
        [
          childrenFirstName,
          childrenLastName,
          childrenNameExtension,
          dateOfBirth,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting data:", err);
            return;
          }
          console.log(
            "Data inserted successfully into Voluntary Work table:",
            result
          );
        }
      );
    });

    // Send response after insertion
    res.json({
      message:
        "File uploaded and data inserted successfully into Voluntary Work table",
    });
  } catch (error) {
    console.error("Error processing XLS file:", error);
    res.status(500).json({ error: "Error processing XLS file" });
  } finally {
    // Delete the uploaded file to save space on the server
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err);
      } else {
        console.log("Uploaded file deleted");
      }
    });
  }
});


//=========================
// UPLOAD XLSX END HERE
//=========================










// PAGE ACCESS  CRUD START -----------------------------------------------------------------------


// Page access
app.get('/api/page_access/:userId/:pageId', (req, res) => {
  const { userId, pageId } = req.params;

  console.log(`Checking access for User ID: ${userId} Page ID: ${pageId}`); // Log for debugging

  const query = `SELECT page_privilege FROM page_access WHERE user_id = ? AND page_id = ?`;
  db.query(query, [userId, pageId], (err, results) => {
      if (err) {
          console.error('Database error:', err); // Log the error
          return res.status(500).json({ error: 'Database error' });
      }
      if (results.length > 0) {
          console.log('Results:', results); // Log the results for debugging
          // Check against the number 1 for access
          return res.json({ hasAccess: results[0].page_privilege === 1 }); // Check against number 1
      } else {
          return res.json({ hasAccess: false });
      }
  });
});
// =====================================
// User Page Access Management
// =====================================

// Search for a user by ID
app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});

// Fetch all pages
app.get('/api/pages', (req, res) => {
  db.query('SELECT * FROM pages', (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Fetch page access for a user
app.get('/api/page_access/:userId', (req, res) => {
  const { userId } = req.params;
  db.query('SELECT * FROM page_access WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Insert a new page access record (grant access), but only if no matching user_id and page_id exists
app.post('/api/page_access', (req, res) => {
  const { user_id, page_id, page_privilege } = req.body;

  // Check if the record already exists
  const checkQuery = 'SELECT * FROM page_access WHERE user_id = ? AND page_id = ?';
  db.query(checkQuery, [user_id, page_id], (err, result) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length > 0) {
      // If record exists, do not insert again
      return res.status(409).json({ message: 'Page access already exists for this user and page' });
    } else {
      // If no record exists, insert a new one
      const insertQuery = 'INSERT INTO page_access (user_id, page_id, page_privilege) VALUES (?, ?, ?)';
      db.query(insertQuery, [user_id, page_id, page_privilege], (err) => {
        if (err) {
          console.error('Database error:', err); // Log the error
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Page access created' });
      });
    }
  });
});

// Update an existing page access record
app.put('/api/page_access/:userId/:pageId', (req, res) => {
  const { userId, pageId } = req.params;
  const { page_privilege } = req.body;
  const query = 'UPDATE page_access SET page_privilege = ? WHERE user_id = ? AND page_id = ?';
  db.query(query, [page_privilege, userId, pageId], (err) => {
    if (err) {
      console.error('Database error:', err); // Log the error
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Page access updated' });
  });
});



 
// PAGE ACCESS  CRUD END -----------------------------------------------------------------------







app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
