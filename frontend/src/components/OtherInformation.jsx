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

const OtherInformation = () => {




  
  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 16; // The page ID for the Profile

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








  // OTHER INFO SCRIPT  START --------------------------------------------------------------------------------------------



  const [data, setData] = useState([]); // To hold voluntary-work data
  const [specialSkills, setNewSpecialSkills] = useState(""); // To hold input for new nameAndAddress
  const [nonAcademicDistinctions, setNewNonAcademicDistinctions] = useState(""); // To hold input for new dateFrom
  const [membershipInAssociation, setNewMembershipInAssociation] = useState(""); // To hold input for new dateTo
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
        "http://localhost:5000/upload/other-information",
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

  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/other-information");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      specialSkills.trim() === "" ||
      nonAcademicDistinctions.trim() === "" ||
      membershipInAssociation.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/other-information", {
      specialSkills: specialSkills,
      nonAcademicDistinctions: nonAcademicDistinctions,
      membershipInAssociation: membershipInAssociation,
    });
    setNewSpecialSkills("");
    setNewNonAcademicDistinctions("");
    setNewMembershipInAssociation("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.specialSkills.trim() === "" ||
      editItem.nonAcademicDistinctions.trim() === "" ||
      editItem.membershipInAssociation.trim() === ""
    )
      return;

    await axios.put(`http://localhost:5000/other-information/${editItem.id}`, {
      specialSkills: editItem.specialSkills,
      nonAcademicDistinctions: editItem.nonAcademicDistinctions,
      membershipInAssociation: editItem.membershipInAssociation,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/other-information/${id}`);
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
      <h1>Other Information Table</h1>

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
          label="Special Skills"
          value={specialSkills}
          onChange={(e) => setNewSpecialSkills(e.target.value)}
        />
        <TextField
          label="Non-Academic Distinctions"
          value={nonAcademicDistinctions}
          onChange={(e) => setNewNonAcademicDistinctions(e.target.value)}
        />

        <TextField
          label="Membership in Association"
          value={membershipInAssociation}
          onChange={(e) => setNewMembershipInAssociation(e.target.value)}
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
            <TableCell>Special Skills</TableCell>
            <TableCell>Non-Academic Distinctions</TableCell>
            <TableCell>Membership in Association</TableCell>
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
                    value={editItem.specialSkills}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        specialSkills: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.specialSkills
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.nonAcademicDistinctions}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        nonAcademicDistinctions: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.nonAcademicDistinctions
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.membershipInAssociation}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        membershipInAssociation: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.membershipInAssociation
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

export default OtherInformation;
