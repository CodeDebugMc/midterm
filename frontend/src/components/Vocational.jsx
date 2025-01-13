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

const Vocational = () => {




  

  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 17; // The page ID for the Profile

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








  // VOCATIONAL SCRIPT  START --------------------------------------------------------------------------------------------

  
  const [data, setData] = useState([]); // To hold voluntary-work data
  const [vocationalNameOfSchool, setNewVocationalNameOfSchool] = useState(""); // To hold input for new nameAndAddress
  const [vocationalDegree, setNewVocationalDegree] = useState(""); // To hold input for new dateFrom
  const [vocationalPeriodFrom, setNewVocationalPeriodFrom] = useState(""); // To hold input for new dateTo
  const [vocationalPeriodTo, setNewVocationalPeriodTo] = useState(""); // To hold input for new numberOfHours
  const [vocationalHighestAttained, setNewVocationalHighestAttained] =
    useState(""); // To hold input for new numberOfWorks
  const [vocationalYearGraduated, setNewVocationalYearGraduated] = useState("");
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
        "http://localhost:5000/upload/vocational",
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
    const response = await axios.get("http://localhost:5000/vocational");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      vocationalNameOfSchool.trim() === "" ||
      vocationalDegree.trim() === "" ||
      vocationalPeriodFrom.trim() === "" ||
      vocationalPeriodTo.trim() === "" ||
      vocationalHighestAttained.trim() === "" ||
      vocationalYearGraduated.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/vocational", {
      vocationalNameOfSchool: vocationalNameOfSchool,
      vocationalDegree: vocationalDegree,
      vocationalPeriodFrom: vocationalPeriodFrom,
      vocationalPeriodTo: vocationalPeriodTo,
      vocationalHighestAttained: vocationalHighestAttained,
      vocationalYearGraduated: vocationalYearGraduated,
    });
    setNewVocationalNameOfSchool("");
    setNewVocationalDegree("");
    setNewVocationalPeriodFrom("");
    setNewVocationalPeriodTo("");
    setNewVocationalHighestAttained("");
    setNewVocationalYearGraduated("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.vocationalNameOfSchool.trim() === "" ||
      editItem.vocationalDegree.trim() === "" ||
      editItem.vocationalPeriodFrom.trim() === "" ||
      editItem.vocationalPeriodTo === "" || // Convert to string before trimming
      editItem.vocationalHighestAttained === "" ||
      editItem.vocationalYearGraduated === ""
    )
      return;

    await axios.put(`http://localhost:5000/vocational/${editItem.id}`, {
      vocationalNameOfSchool: editItem.vocationalNameOfSchool,
      vocationalDegree: editItem.vocationalDegree,
      vocationalPeriodFrom: editItem.vocationalPeriodFrom,
      vocationalPeriodTo: editItem.vocationalPeriodTo, // Ensure it's a string
      vocationalHighestAttained: editItem.vocationalHighestAttained,
      vocationalYearGraduated: editItem.vocationalYearGraduated,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/vocational/${id}`);
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
      <h1>Vocational Table</h1>

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
          label="Vocational Name of School"
          value={vocationalNameOfSchool}
          onChange={(e) => setNewVocationalNameOfSchool(e.target.value)}
        />
        <TextField
          label="Vocational Degree"
          value={vocationalDegree}
          onChange={(e) => setNewVocationalDegree(e.target.value)}
        />
        <TextField
          label="Vocational Period From"
          value={vocationalPeriodFrom}
          onChange={(e) => setNewVocationalPeriodFrom(e.target.value)}
        />
        <TextField
          label="Vocational Period To"
          value={vocationalPeriodTo}
          onChange={(e) => setNewVocationalPeriodTo(e.target.value)}
        />
        <TextField
          label="Vocational Highest Attained"
          value={vocationalHighestAttained}
          onChange={(e) => setNewVocationalHighestAttained(e.target.value)}
        />
        <TextField
          label="Vocational Year Graduated"
          value={vocationalYearGraduated}
          onChange={(e) => setNewVocationalYearGraduated(e.target.value)}
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
            <TableCell>Vocational Name of School</TableCell>
            <TableCell>Vocational Degree</TableCell>
            <TableCell>Vocational Period From</TableCell>
            <TableCell>Vocational Period To</TableCell>
            <TableCell>Vocational Highest Attained</TableCell>
            <TableCell>Vocational Year Graduated</TableCell>
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
                    value={editItem.vocationalNameOfSchool}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalNameOfSchool: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.vocationalNameOfSchool
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.vocationalDegree}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalDegree: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.vocationalDegree
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.vocationalPeriodFrom}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalPeriodFrom: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.vocationalPeriodFrom)
                )}
              </TableCell>

              {/* cell for the numberOfHours */}
              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.vocationalPeriodTo} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalPeriodTo: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDate(item.vocationalPeriodTo)
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.vocationalHighestAttained} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalHighestAttained: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.vocationalHighestAttained
                )}
              </TableCell>

              <TableCell>
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.vocationalYearGraduated} // Ensure value is a string
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        vocationalYearGraduated: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.vocationalYearGraduated
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

export default Vocational;
