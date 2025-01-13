import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
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

const WorkExperience = () => {



  

  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 18; // The page ID for the Profile

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








  // WORK EXPERIENCE SCRIPT  START --------------------------------------------------------------------------------------------





  const [data, setData] = useState([]); // To hold voluntary-work data
  const [workDateFrom, setNewWorkDateFrom] = useState(""); // To hold input for new nameAndAddress
  const [workDateTo, setNewWorkDateTo] = useState(""); // To hold input for new dateFrom
  const [workPositionTitle, setNewWorkPositionTitle] = useState(""); // To hold input for new dateTo
  const [workCompany, setNewWorkCompany] = useState(""); // To hold input for new numberOfHours
  const [workMonthlySalary, setNewWorkMonthlySalary] = useState(""); // To hold input for new numberOfWorks
  const [salaryJobOrPayGrade, setNewSalaryJobOrPayGrade] = useState("");
  const [statusOfAppointment, setNewStatusOfAppointment] = useState("");
  const [isGovtService, setNewIsGovtService] = useState("");
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
        "http://localhost:5000/upload/work-experience",
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
    const response = await axios.get("http://localhost:5000/work-experience");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      workDateFrom.trim() === "" ||
      workDateTo.trim() === "" ||
      workPositionTitle.trim() === "" ||
      workCompany.trim() === "" ||
      workMonthlySalary.trim() === "" ||
      salaryJobOrPayGrade.trim() === "" ||
      statusOfAppointment.trim() === "" ||
      isGovtService.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/work-experience", {
      workDateFrom: workDateFrom,
      workDateTo: workDateTo,
      workPositionTitle: workPositionTitle,
      workCompany: workCompany,
      workMonthlySalary: workMonthlySalary,
      salaryJobOrPayGrade: salaryJobOrPayGrade,
      statusOfAppointment: statusOfAppointment,
      isGovtService: isGovtService,
    });
    setNewWorkDateFrom("");
    setNewWorkDateTo("");
    setNewWorkPositionTitle("");
    setNewWorkCompany("");
    setNewWorkMonthlySalary("");
    setNewSalaryJobOrPayGrade("");
    setNewStatusOfAppointment("");
    setNewIsGovtService("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.workDateFrom.trim() === "" ||
      editItem.workDateTo.trim() === "" ||
      editItem.workPositionTitle.trim() === "" ||
      editItem.workCompany.trim() === "" || // Convert to string before trimming
      editItem.workMonthlySalary === "" ||
      editItem.salaryJobOrPayGrade === "" ||
      editItem.statusOfAppointment.trim() === "" ||
      editItem.isGovtService.trim() === ""
    )
      return;

    await axios.put(`http://localhost:5000/work-experience/${editItem.id}`, {
      workDateFrom: editItem.workDateFrom,
      workDateTo: editItem.workDateTo,
      workPositionTitle: editItem.workPositionTitle,
      workCompany: editItem.workCompany, // Ensure it's a string
      workMonthlySalary: editItem.workMonthlySalary,
      salaryJobOrPayGrade: editItem.salaryJobOrPayGrade,
      statusOfAppointment: editItem.statusOfAppointment,
      isGovtService: editItem.isGovtService,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/work-experience/${id}`);
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
      <h1>Work Experience Table</h1>

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
          label="Work Date From"
          value={workDateFrom}
          onChange={(e) => setNewWorkDateFrom(e.target.value)}
        />
        <TextField
          label="Work Date To"
          value={workDateTo}
          onChange={(e) => setNewWorkDateTo(e.target.value)}
        />
        <TextField
          label="Work Position Title"
          value={workPositionTitle}
          onChange={(e) => setNewWorkPositionTitle(e.target.value)}
        />
        <TextField
          label="Work Company"
          value={workCompany}
          onChange={(e) => setNewWorkCompany(e.target.value)}
        />
        <TextField
          label="Work Monthly Salary"
          value={workMonthlySalary}
          onChange={(e) => setNewWorkMonthlySalary(e.target.value)}
        />
        <TextField
          label="Salaryjob or Paygrade"
          value={salaryJobOrPayGrade}
          onChange={(e) => setNewSalaryJobOrPayGrade(e.target.value)}
        />
        <TextField
          label="Status of Appointment"
          value={statusOfAppointment}
          onChange={(e) => setNewStatusOfAppointment(e.target.value)}
        />
        <TextField
          label="isGovtService"
          value={isGovtService}
          onChange={(e) => setNewIsGovtService(e.target.value)}
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
            <TableCell>workDateFrom</TableCell>
            <TableCell>workDateTo</TableCell>
            <TableCell>workPositionTitle</TableCell>
            <TableCell>workCompany</TableCell>
            <TableCell>workMonthlySalary</TableCell>
            <TableCell>salaryJobOrPayGrade</TableCell>
            <TableCell>statusOfAppointment</TableCell>
            <TableCell>isGovtService</TableCell>
            <TableCell>Actions</TableCell>
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
                    value={editItem.workDateFrom}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        workDateFrom: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.workDateFrom)
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.workDateTo}
                    onChange={(e) =>
                      setEditItem({ ...editItem, workDateTo: e.target.value })
                    }
                  />
                ) : (
                  formatDate(item.workDateTo)
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.workPositionTitle}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        workPositionTitle: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.workPositionTitle
                )}
              </TableCell>

              {/* cell for the numberOfHours */}
              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.workCompany} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        workCompany: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.workCompany
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.workMonthlySalary} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        workMonthlySalary: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.workMonthlySalary
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.salaryJobOrPayGrade} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        salaryJobOrPayGrade: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.salaryJobOrPayGrade
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.statusOfAppointment} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        statusOfAppointment: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.statusOfAppointment
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.isGovtService} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        isGovtService: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.isGovtService
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

export default WorkExperience;
