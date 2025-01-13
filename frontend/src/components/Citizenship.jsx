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

const Citizenship = () => {

    
// PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 19; // The page ID for the Profile

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








  // CITIZWNSHIP SCRIPT  START --------------------------------------------------------------------------------------------
  const [data, setData] = useState([]); // To hold voluntary-work data
  const [citizenshipDescription, setNewCitizenshipDescription] = useState(""); // To hold input for new nameAndAddress
  const [citizenshipType, setNewCitizenshipType] = useState(""); // To hold input for new dateFrom
  const [countryName, setNewCountryName] = useState(""); // To hold input for new dateTo
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
        "http://localhost:5000/upload/citizenship",
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
    const response = await axios.get("http://localhost:5000/citizenship");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      citizenshipDescription.trim() === "" ||
      citizenshipType.trim() === "" ||
      countryName.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/citizenship", {
      citizenshipDescription: citizenshipDescription,
      citizenshipType: citizenshipType,
      countryName: countryName,
    });
    setNewCitizenshipDescription("");
    setNewCitizenshipType("");
    setNewCountryName("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.citizenshipDescription.trim() === "" ||
      editItem.citizenshipType.trim() === "" ||
      editItem.countryName.trim() === ""
    )
      return;

    await axios.put(`http://localhost:5000/citizenship/${editItem.id}`, {
      citizenshipDescription: editItem.citizenshipDescription,
      citizenshipType: editItem.citizenshipType,
      countryName: editItem.countryName,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/citizenship/${id}`);
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
      <h1>Citizenship Table</h1>

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
          label="Citizenship Description"
          value={citizenshipDescription}
          onChange={(e) => setNewCitizenshipDescription(e.target.value)}
        />
        <TextField
          label="Citizenship Type"
          value={citizenshipType}
          onChange={(e) => setNewCitizenshipType(e.target.value)}
        />

        <TextField
          label="Country Name"
          value={countryName}
          onChange={(e) => setNewCountryName(e.target.value)}
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
            <TableCell>Citizenship Description</TableCell>
            <TableCell>Citizenship Type</TableCell>
            <TableCell>Country Name</TableCell>
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
                    value={editItem.citizenshipDescription}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        citizenshipDescription: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.citizenshipDescription
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.citizenshipType}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        citizenshipType: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.citizenshipType
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.countryName}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        countryName: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.countryName
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

export default Citizenship;
