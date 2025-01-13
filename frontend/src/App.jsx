import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SettingsForm from "./SettingsForm";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';
import Pds1 from './components/Pds1';
import Pds2 from './components/Pds2';
import Pds3 from './components/Pds3';
import Pds4 from './components/Pds4';





//Module of UPLOAD XLS Start here
import UploadXLS from "./components/UploadXLS";
import SearchEmployee from "./components/SearchEmployee";
import UploadEmployeeInfo from "./components/UploadEmployeeInfo";
import LearningAndDevelopment from "./components/LearningAndDevelopment";
import Eligibility from "./components/Eligibility";
import College from "./components/College";
import OtherInformation from "./components/OtherInformation";
import Vocational from "./components/Vocational";
import WorkExperience from "./components/WorkExperience";
import Citizenship from "./components/Citizenship";
import Children from "./components/Children";
import PageCRUD from './components/PageCRUD';



import UserPageAccess from './components/UserPageAccess';


const drawerWidth = 240;

function App() {
  const [settings, setSettings] = useState({});

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/settings");
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Header */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: settings.header_color || "primary",
          }}
        >
          <Toolbar>
            {settings.logo_url && (
              <img
                src={`http://localhost:5000${settings.logo_url}`}
                alt="Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
            )}
            <Typography variant="h6" noWrap>
              {settings.company_name || "My Company Name"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <List>
            <ListItem button component={Link} to="/home">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/voluntary-works">
              <ListItemText primary="Voluntary work" />
            </ListItem>
            <ListItem button component={Link} to="/learning-and-development">
              <ListItemText primary="LearningAndDevelopment" />
            </ListItem>
            <ListItem button component={Link} to="/eligibility">
              <ListItemText primary="Eligibility" />
            </ListItem>
            <ListItem button component={Link} to="/college">
              <ListItemText primary="College" />
            </ListItem>
            <ListItem button component={Link} to="/other-information">
              <ListItemText primary="Other Information" />
            </ListItem>
            <ListItem button component={Link} to="/vocational">
              <ListItemText primary="Vocational" />
            </ListItem>
            <ListItem button component={Link} to="/work-experience">
              <ListItemText primary="Work Experience" />
            </ListItem>
            <ListItem button component={Link} to="/citizenship">
              <ListItemText primary="Citizenship" />
            </ListItem>
            <ListItem button component={Link} to="/children">
              <ListItemText primary="Children" />
            </ListItem>
            {/* <ListItem button component={Link} to="/upload-voluntary-works-xls">
              <ListItemText primary="Upload XLS" />
            </ListItem> */}
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/contact">
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemText primary="Settings" />
            </ListItem>


            <ListItem button component={Link} to="/page-crud">
              <ListItemText primary="PageCRUD" />
            </ListItem>

            <ListItem button component={Link} to="/page-access">
              <ListItemText primary="UserPageAccess" />
            </ListItem>

            <ListItem button component={Link} to="/pds-1">
              <ListItemText primary="Pds1" />
            </ListItem>
            
            <ListItem button component={Link} to="/pds-2">
              <ListItemText primary="Pds2" />
            </ListItem>
            
            <ListItem button component={Link} to="/pds-3">
              <ListItemText primary="Pds3" />
            </ListItem>

            
            <ListItem button component={Link} to="/pds-4">
              <ListItemText primary="Pds4" />
            </ListItem>


          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            marginLeft: `${drawerWidth}px`,
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/voluntary-works" element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
              } />


            <Route path="/learning-and-development" element={
              <ProtectedRoute>
              <LearningAndDevelopment />
              </ProtectedRoute>
            }
            />
            <Route path="/eligibility" element={
              <ProtectedRoute>
              <Eligibility />
              </ProtectedRoute>
              } />

            <Route path="/other-information" element={
              <ProtectedRoute>
              <OtherInformation />
              </ProtectedRoute>
              } />

            <Route path="/vocational" element={
              <ProtectedRoute>
              <Vocational />
              </ProtectedRoute>
              } />

            <Route path="/college" element={
              <ProtectedRoute>
              <College />
              </ProtectedRoute>
              } />

            <Route path="/work-experience" element={
              <ProtectedRoute>
              <WorkExperience />
              </ProtectedRoute>
              } />

            <Route path="/citizenship" element={
              <ProtectedRoute>
              <Citizenship />
              </ProtectedRoute>
              } />

            <Route path="/children" element={
              <ProtectedRoute>
              <Children />
              </ProtectedRoute>
              } />



            {/*UPLOAD XLSX Path */}
            <Route path="/upload-voluntary-works-xls" element={
              <ProtectedRoute>
              <UploadXLS />
              </ProtectedRoute>
              } />

            <Route path="/search-employee" element={
              <ProtectedRoute>
              <SearchEmployee />
              </ProtectedRoute>
              } />

            <Route path="/upload-employee" element={
              <ProtectedRoute>
              <UploadEmployeeInfo />
              </ProtectedRoute>
              } />



            <Route path="/home" element={
               <ProtectedRoute>
              <Home />
              </ProtectedRoute>
              } />

            <Route path="/about" element={
               <ProtectedRoute>
              <About />
              /</ProtectedRoute>
              } />


            <Route path="/contact" element={
               <ProtectedRoute><Contact />
                </ProtectedRoute>} />

            <Route path="/settings" element={
              <ProtectedRoute>
              <SettingsForm onUpdate={fetchSettings} />
              </ProtectedRoute>
            }/>

      <Route path="/page-crud" element={
         <ProtectedRoute>
        <PageCRUD />
        </ProtectedRoute>
        } />

      <Route path="/page-access" element={
     <ProtectedRoute>
        <UserPageAccess />
      </ProtectedRoute>
        } />  

      
      <Route path="/pds-1" element={
        <ProtectedRoute>
             <Pds1 />
        </ProtectedRoute>
                } />

      <Route path="/pds-2" element={
        <ProtectedRoute>
        <Pds2 />
        </ProtectedRoute>
        } />  

      <Route path="/pds-3" element={
        <ProtectedRoute>
        <Pds3 />
        </ProtectedRoute>
        } />  

      
      <Route path="/pds-4" element={
        <ProtectedRoute>
        <Pds4 />
        </ProtectedRoute>} />  






          </Routes>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            width: "100%", // Make sure it spans the full width
            position: "fixed", // Adjust positioning
            bottom: 0, // Fix it to the bottom
            left: 0, // Align to the left side
            zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above the drawer z-index
            bgcolor: settings.footer_color || "#ffffff",
            color: "black",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography variant="body1">
            {settings.footer_text || "Default Footer Text"}
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
