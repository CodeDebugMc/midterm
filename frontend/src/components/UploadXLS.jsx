import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";

const UploadXLS = () => {
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
        "http://localhost:5000/upload-xls",
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

  return (
    <>
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
        {message && (
          <Alert severity={messageType} sx={{ marginTop: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default UploadXLS;
