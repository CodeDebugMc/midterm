import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Input, InputLabel } from "@mui/material";

function SettingsForm({ onUpdate }) {

  
// PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 11; // The page ID for the Profile

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








  // SETTINGSFORM SCRIPT  START --------------------------------------------------------------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState(null);
  const [headerColor, setHeaderColor] = useState("#ffffff");
  const [footerText, setFooterText] = useState("");
  const [footerColor, setFooterColor] = useState("#ffffff");

  useEffect(() => { 
    // Fetch current settings to populate the form fields
    axios
      .get("http://localhost:5000/api/settings")
      .then((response) => {
        const { company_name, header_color, footer_text, footer_color } =
          response.data;
        setCompanyName(company_name || "");
        setHeaderColor(header_color || "#ffffff");
        setFooterText(footer_text || "");
        setFooterColor(footer_color || "#ffffff");
      })
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a form data object for the logo upload
    const formData = new FormData();

    // Ensure the fields are not null or empty strings
    formData.append("company_name", companyName || "");
    formData.append("logo", logo);
    formData.append("header_color", headerColor || "#ffffff");
    formData.append("footer_text", footerText || "");
    formData.append("footer_color", footerColor || "#ffffff");

    try {
      // Send the form data to the server to update settings
      await axios.post("http://localhost:5000/api/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Call the parent update function to refresh the settings in the app
      onUpdate();
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  // SETTINGSFORM SCRIPT  END --------------------------------------------------------------------------------------------





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
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel htmlFor="companyName">Company Name</InputLabel>
        <TextField
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>

      <div>
        <InputLabel htmlFor="logo">Logo</InputLabel>
        <Input
          id="logo"
          type="file"
          onChange={(e) => setLogo(e.target.files[0])}
          fullWidth
          margin="normal"
        />
      </div>

      <div>
        <InputLabel htmlFor="headerColor">Header Color</InputLabel>
        <Input
          id="headerColor"
          type="color"
          value={headerColor}
          onChange={(e) => setHeaderColor(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>

      <div>
        <InputLabel htmlFor="footerText">Footer Text</InputLabel>
        <TextField
          id="footerText"
          value={footerText}
          onChange={(e) => setFooterText(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>

      <div>
        <InputLabel htmlFor="footerColor">Footer Color</InputLabel>
        <Input
          id="footerColor"
          type="color"
          value={footerColor}
          onChange={(e) => setFooterColor(e.target.value)}
          fullWidth
          margin="normal"
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Save Settings
      </Button>
    </form>
  );
}

export default SettingsForm;
