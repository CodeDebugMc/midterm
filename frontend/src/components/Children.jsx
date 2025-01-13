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

const Children = () => {

   
// PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 20; // The page ID for the Profile

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








  // CHILDREN SCRIPT  START --------------------------------------------------------------------------------------------
  const [data, setData] = useState([]); // To hold voluntary-work data
  const [childrenFirstName, setNewChildrenFirstName] = useState(""); // To hold input for new nameAndAddress
  const [childrenLastName, setNewChildrenLastName] = useState(""); // To hold input for new dateFrom
  const [childrenNameExtension, setNewChildrenNameExtension] = useState(""); // To hold input for new dateTo
  const [dateOfBirth, setNewDateOfBirth] = useState("");
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
        "http://localhost:5000/upload/children",
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
    const response = await axios.get("http://localhost:5000/children");
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      childrenFirstName.trim() === "" ||
      childrenLastName.trim() === "" ||
      childrenNameExtension.trim() === "" ||
      dateOfBirth.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/children", {
      childrenFirstName: childrenFirstName,
      childrenLastName: childrenLastName,
      childrenNameExtension: childrenNameExtension,
      dateOfBirth: dateOfBirth,
    });
    setNewChildrenFirstName("");
    setNewChildrenLastName("");
    setNewChildrenNameExtension("");
    setNewDateOfBirth("");
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.childrenFirstName.trim() === "" ||
      editItem.childrenLastName.trim() === "" ||
      editItem.childrenNameExtension.trim() === "" ||
      editItem.dateOfBirth.trim() === ""
    )
      return;

    await axios.put(`http://localhost:5000/children/${editItem.id}`, {
      childrenFirstName: editItem.childrenFirstName,
      childrenLastName: editItem.childrenLastName,
      childrenNameExtension: editItem.childrenNameExtension,
      dateOfBirth: editItem.dateOfBirth,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/children/${id}`);
    fetchItems();
  };

// Logout function
const handleLogout = () => {


  // Clear the token from localStorage
  localStorage.removeItem('token');


  // Redirect to login page
  navigate('/login');
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
      <h1>Children Table</h1>

      {/* Logout Button */}
      <Button onClick={handleLogout} variant="contained" color="error">
          Logout
        </Button>


      {/* Add New Item */}
      <div>
        <TextField
          label="Children Firstname"
          value={childrenFirstName}
          onChange={(e) => setNewChildrenFirstName(e.target.value)}
        />
        <TextField
          label="Children Lastname"
          value={childrenLastName}
          onChange={(e) => setNewChildrenLastName(e.target.value)}
        />

        <TextField
          label="Children Name Extension"
          value={childrenNameExtension}
          onChange={(e) => setNewChildrenNameExtension(e.target.value)}
        />

        <TextField
          label="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setNewDateOfBirth(e.target.value)}
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
            <TableCell>Children Firstname</TableCell>
            <TableCell>Children Lastname</TableCell>
            <TableCell>Children Name Extension</TableCell>
            <TableCell>Date of Birth</TableCell>
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
                    value={editItem.childrenFirstName}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        childrenFirstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.childrenFirstName
                )}
              </TableCell>

              {/* cell for the last name */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.childrenLastName}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        childrenLastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.childrenLastName
                )}
              </TableCell>

              {/* cell for the dateTo */}
              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.childrenNameExtension}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        childrenNameExtension: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.childrenNameExtension
                )}
              </TableCell>

              <TableCell>
                {/* Editable field */}
                {editItem && editItem.id === item.id ? (
                  <TextField
                    value={editItem.dateOfBirth}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.dateOfBirth
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

export default Children;
