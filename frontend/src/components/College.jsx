import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router for navigation

const College = () => {





  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 15; // The page ID for the Profile

    // If userId is missing, deny access early
    if (!userId) {
        setHasAccess(false);
        return;
    }

    // Function to check if the user has access
    const checkAccess = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/page_access/${userId}/${pageId}`);
            
            // Check if the API response contains the 'hasAccess' field
            if (response.data && typeof response.data.hasAccess === 'boolean') {
                setHasAccess(response.data.hasAccess);
            } else {
                console.error('Unexpected API response format:', response.data);
                setHasAccess(false);
            }
        } catch (error) {
            console.error('Error checking access:', error);
            setHasAccess(false); // No access if there's an error
        }
    };

    checkAccess();
}, []);





// PAGE ACCESS SCRIPT ------------------------ UPPER PART --- END








  // COLLEGE SCRIPT  START --------------------------------------------------------------------------------------------

  const [data, setData] = useState([]); // To hold voluntary-work data
  const [collegeNameOfSchool, setNewCollegeNameOfSchool] = useState(""); // To hold input for new nameAndAddress
  const [collegeDegree, setNewCollegeDegree] = useState(""); // To hold input for new dateFrom
  const [collegePeriodFrom, setNewCollegePeriodFrom] = useState(""); // To hold input for new dateTo
  const [collegePeriodTo, setNewCollegePeriodTo] = useState(""); // To hold input for new numberOfHours
  const [collegeHighestAttained, setNewCollegeHighestAttained] = useState(""); // To hold input for new numberOfWorks
  const [collegeYearGraduated, setNewCollegeYearGraduated] = useState(""); // To hold input for new numberOfWorks
  const [
    collegeScholarshipAcademicHonorsReceived,
    setNewCollegeScholarshipAcademicHonorsReceived,
  ] = useState("");
  const [editItem, setEditItem] = useState(null); // To hold item being edited
  const navigate = useNavigate(); // Hook for navigating to different routes
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // Success or error

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Clear previous messages when a new file is selected
  };

  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!file) {
      setMessage("Please select a file to upload.");
      setMessageType("error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload/college",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message || "File uploaded successfully!");
      setMessageType("success");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("File upload failed. Please try again.");
      setMessageType("error");
    }
  };
  // Fetch all voluntary-work on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/college");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      collegeNameOfSchool.trim() === "" ||
      collegeDegree.trim() === "" ||
      collegePeriodFrom.trim() === "" ||
      collegePeriodTo.trim() === "" ||
      collegeHighestAttained.trim() === "" ||
      collegeYearGraduated.trim() === "" ||
      collegeScholarshipAcademicHonorsReceived.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/college", {
      collegeNameOfSchool: collegeNameOfSchool,
      collegeDegree: collegeDegree,
      collegePeriodFrom: collegePeriodFrom,
      collegePeriodTo: collegePeriodTo,
      collegeHighestAttained: collegeHighestAttained,
      collegeYearGraduated: collegeYearGraduated,
      collegeScholarshipAcademicHonorsReceived:
        collegeScholarshipAcademicHonorsReceived,
    });
    setNewCollegeNameOfSchool("");
    setNewCollegeDegree("");
    setNewCollegePeriodFrom("");
    setNewCollegePeriodTo("");
    setNewCollegeHighestAttained("");
    setNewCollegeYearGraduated("");
    setNewCollegeScholarshipAcademicHonorsReceived("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.collegeNameOfSchool.trim() === "" ||
      editItem.collegeDegree.trim() === "" ||
      editItem.collegePeriodFrom.trim() === "" ||
      editItem.collegePeriodTo.trim() === "" || // Convert to string before trimming
      editItem.collegeHighestAttained.trim() === "" ||
      editItem.collegeYearGraduated.trim() === "" ||
      editItem.collegeScholarshipAcademicHonorsReceived.trim() === ""
    )
      return;

    await axios.put(`http://localhost:5000/college/${editItem.id}`, {
      collegeNameOfSchool: editItem.collegeNameOfSchool,
      collegeDegree: editItem.collegeDegree,
      collegePeriodFrom: editItem.collegePeriodFrom,
      collegePeriodTo: editItem.collegePeriodTo, // Ensure it's a string
      collegeHighestAttained: editItem.collegeHighestAttained,
      collegeYearGraduated: editItem.collegeYearGraduated,
      collegeScholarshipAcademicHonorsReceived:
        editItem.collegeScholarshipAcademicHonorsReceived,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/college/${id}`);
    fetchItems();
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear authentication (for example, token)
    localStorage.removeItem("authToken"); // Assuming the token is stored in localStorage
    navigate("/login"); // Redirect to login page after logout
  };




  
  // PAGE ACCESS SCRIPT ------------------------ LOWER PART --- START

    // If hasAccess is still null, show a loading state
    if (hasAccess === null) {
      return <div>Loading access information...</div>;
  }

  // Deny access if hasAccess is false
  if (!hasAccess) {
      return <div>You do not have access to this page. Contact the administrator to request access.</div>;
  }




// PAGE ACCESS SCRIPT ------------------------ LOWER PART --- END

  return (
    <><Box
    component="form"
    onSubmit={handleFileUpload}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      p: 3,
      border: "1px solid #ddd",
      borderRadius: 2,
      width: 400,
      margin: "auto",
      marginTop: 4,
    }}
  >
    <Typography variant="h5" gutterBottom>
      Upload a File
    </Typography>

    <TextField type="file" onChange={handleFileChange} fullWidth />

    <Button type="submit" variant="contained" color="primary">
      Submit
    </Button>

    {/* Display success or error message */}
    {message && (
      <Alert severity={messageType} sx={{ marginTop: 2, width: "100%" }}>
        {message}
      </Alert>
    )}
  </Box>
    <Container>
      <h1>College Table</h1>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        style={{ float: "right" }}
      >
        Logout
      </Button>

      {/* Add New Item */}
      <div>
        <TextField
          label="College Name of School"
          value={collegeNameOfSchool}
          onChange={(e) => setNewCollegeNameOfSchool(e.target.value)}
        />
        <TextField
          label="College Degree"
          value={collegeDegree}
          onChange={(e) => setNewCollegeDegree(e.target.value)}
        />
        <TextField
          label="College Period From"
          value={collegePeriodFrom}
          onChange={(e) => setNewCollegePeriodFrom(e.target.value)}
        />
        <TextField
          label="College Period To"
          value={collegePeriodTo}
          onChange={(e) => setNewCollegePeriodTo(e.target.value)}
        />
        <TextField
          label="College Highest Attained"
          value={collegeHighestAttained}
          onChange={(e) => setNewCollegeHighestAttained(e.target.value)}
        />

        <TextField
          label="College Year Graduated"
          value={collegeYearGraduated}
          onChange={(e) => setNewCollegeYearGraduated(e.target.value)}
        />

        <TextField
          label="College Scholarship Academic Honors Received"
          value={collegeScholarshipAcademicHonorsReceived}
          onChange={(e) =>
            setNewCollegeScholarshipAcademicHonorsReceived(e.target.value)
          }
        />

        <Button onClick={addItem} variant="contained" color="primary">
          Add
        </Button>
      </div>

      {/* voluntary-work Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>College Name of School</TableCell>
            <TableCell>College Degree</TableCell>
            <TableCell>College Period From</TableCell>
            <TableCell>College Period To</TableCell>
            <TableCell>College Highest Attained</TableCell>
            <TableCell>College Year Graduated</TableCell>
            <TableCell>College Schilarship Academic Honors Received</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegeNameOfSchool}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegeNameOfSchool: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.collegeNameOfSchool
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegeDegree}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegeDegree: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.collegeDegree
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegePeriodFrom}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegePeriodFrom: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.collegePeriodFrom)
                )}
              </TableCell>

              {/* cell for the numberOfHours */}
              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegePeriodTo} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegePeriodTo: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.collegePeriodTo)
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegeHighestAttained} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegeHighestAttained: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.collegeHighestAttained
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegeYearGraduated} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegeYearGraduated: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.collegeYearGraduated)
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.collegeScholarshipAcademicHonorsReceived} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        collegeScholarshipAcademicHonorsReceived:
                          e.target.value,
                      })
                    }
                  />
                ) : (
                  item.collegeScholarshipAcademicHonorsReceived
                )}
              </TableCell>

              <TableCell>
                {/* Show Save/Cancel if editing */}
                {editItem && editItem.id === item.id ? (
                  <>
                    <Button
                      onClick={updateItem}
                      variant="contained"
                      color="primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditItem(null)}
                      variant="outlined"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => setEditItem(item)}
                      variant="outlined"
                      color="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteItem(item.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
    </>
  );
};

export default College;
