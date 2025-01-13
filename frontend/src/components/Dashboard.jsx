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

const Dashboard = () => {



  
// PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 12; // The page ID for the Profile

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








  // DASHBOARD SCRIPT  START --------------------------------------------------------------------------------------------

  const [data, setData] = useState([]); // Stores the voluntary work records fetched from the backend.
  const [nameAndAddress, setNewNameAndAddress] = useState(""); // To hold input for new nameAndAddress
  const [dateFrom, setNewDateFrom] = useState(""); // To hold input for new dateFrom
  const [dateTo, setNewDateTo] = useState(""); // To hold input for new dateTo
  const [numberOfHours, setNewNumberOfHours] = useState(""); // To hold input for new numberOfHours
  const [numberOfWorks, setNewNumberOfWorks] = useState(""); // To hold input for new numberOfWorks
  const [editItem, setEditItem] = useState(null); // Tracks the item being edited for inline editing.
  const navigate = useNavigate(); // Hook for navigating to different routes
  const [file, setFile] = useState(null); // Manages the selected file for uploading.
  const [message, setMessage] = useState(""); //Display success or error messages for the file upload.
  const [messageType, setMessageType] = useState("success"); // Display success or error messages for the file upload.



  // Fetches all voluntary work records from the server using the GET request
  const fetchItems = async () => {
    const response = await axios.get("http://localhost:5000/voluntary-work");
    setData(response.data);
  };

    // Fetch all voluntary-work on component mount
    useEffect(() => {
      fetchItems();
    }, []);

  // Add new item
  // Sends new voluntary work data to the server using POST request.
  const addItem = async () => {
    if (
      nameAndAddress.trim() === "" ||
      dateFrom.trim() === "" ||
      dateTo.trim() === "" ||
      numberOfHours.trim() === "" ||
      numberOfWorks.trim() === ""
    )
      return;
    await axios.post("http://localhost:5000/voluntary-work", {
      nameAndAddress: nameAndAddress,
      dateFrom: dateFrom,
      dateTo: dateTo,
      numberOfHours: numberOfHours,
      numberOfWorks: numberOfWorks,
    });
    setNewNameAndAddress("");
    setNewDateFrom("");
    setNewDateTo("");
    setNewNumberOfHours("");
    setNewNumberOfWorks("");
    fetchItems();
  };

  // Update item
  // Updates an existing voluntary work record using PUT request.
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.nameAndAddress.trim() === "" ||
      editItem.dateFrom.trim() === "" ||
      editItem.dateTo.trim() === "" ||
      editItem.numberOfHours === "" || // Convert to string before trimming
      editItem.numberOfWorks === ""
    )
      return;

    await axios.put(`http://localhost:5000/voluntary-work/${editItem.id}`, {
      nameAndAddress: editItem.nameAndAddress,
      dateFrom: editItem.dateFrom,
      dateTo: editItem.dateTo,
      numberOfHours: editItem.numberOfHours, // Ensure it's a string
      numberOfWorks: editItem.numberOfWorks,
    });

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  // Deletes a record from the server using DELETE request.
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/voluntary-work/${id}`);
    fetchItems();
  };

  // Updates the file state when a new file is selected.
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(""); // Clear previous messages when a new file is selected
  };

  // Uploads the selected file using FormData and displays success or error messages using POST request.
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
        "http://localhost:5000/upload/voluntary-work",
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

  // Handle Logout
  // Clears the auth token from localStorage and redirects the user to the login page using navigate("/login").
  const handleLogout = () => {
    // Clear authentication (for example, token)
    localStorage.removeItem("authToken"); // Assuming the token is stored in localStorage
    navigate("/login"); // Redirect to login page after logout
  };

  // Converts a date string into a YYYY-MM-DD format for better readability.
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  // DASHBOARD SCRIPT  END --------------------------------------------------------------------------------------------





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
    <>
      {/*A form for uploading files. */}
      <Box
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
        {/* Displays feedback messages. */}
        {message && (
          <Alert severity={messageType} sx={{ marginTop: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
      </Box>
      <Container>
        <h1>Voluntary Works Table</h1>

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
            label="Name and Address"
            value={nameAndAddress}
            onChange={(e) => setNewNameAndAddress(e.target.value)}
          />
          <TextField
            label="Date From"
            value={dateFrom}
            onChange={(e) => setNewDateFrom(e.target.value)}
          />
          <TextField
            label="Date To"
            value={dateTo}
            onChange={(e) => setNewDateTo(e.target.value)}
          />
          <TextField
            label="Number of Hours"
            value={numberOfHours}
            onChange={(e) => setNewNumberOfHours(e.target.value)}
          />
          <TextField
            label="Number of Works"
            value={numberOfWorks}
            onChange={(e) => setNewNumberOfWorks(e.target.value)}
          />
          <Button onClick={addItem} variant="contained" color="primary">
            Add
          </Button>
        </div>

        {/* voluntary-work Table */}
        {/* Displays the voluntary work data in tabular form with options to edit or delete records. */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name and Address</TableCell>
              <TableCell>Date From</TableCell>
              <TableCell>Date To</TableCell>
              <TableCell>Number of Hours</TableCell>
              <TableCell>Number of Works</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {/* Editable field */}
                  {/* Input fields for adding or editing data. */}
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.nameAndAddress}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          nameAndAddress: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.nameAndAddress
                  )}
                </TableCell>

                {/* cell for the last name */}
                <TableCell>
                  {/* Editable field */}
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.dateFrom}
                      onChange={(e) =>
                        setEditItem({ ...editItem, dateFrom: e.target.value })
                      }
                    />
                  ) : (
                    formatDate(item.dateFrom)
                  )}
                </TableCell>

                {/* cell for the dateTo */}
                <TableCell>
                  {/* Editable field */}
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.dateTo}
                      onChange={(e) =>
                        setEditItem({ ...editItem, dateTo: e.target.value })
                      }
                    />
                  ) : (
                    formatDate(item.dateTo)
                  )}
                </TableCell>

                {/* cell for the numberOfHours */}
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={String(editItem.numberOfHours)} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          numberOfHours: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.numberOfHours
                  )}
                </TableCell>

                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={String(editItem.numberOfWorks)} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          numberOfWorks: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.numberOfWorks
                  )}
                </TableCell>

                <TableCell>
                  {/* Show Save/Cancel if editing */}
                  {/* Triggers actions like Add, Edit, Save, Delete, or Logout. */}
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

export default Dashboard;
