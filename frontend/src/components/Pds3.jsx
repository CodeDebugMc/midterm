import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableCell, TableRow } from '@mui/material';

const Pds3 = () => {
  const [data, setData] = useState([]); // Stores the voluntary work records fetched from the backend.

  // Fetches all voluntary work records from the server using the GET request
  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/voluntary-work');
    setData(response.data);
  };

  // Fetch all voluntary-work on component mount
  useEffect(() => {
    fetchItems();
  }, []);
  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

  const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

  useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 23; // The page ID for the Profile

    // If userId is missing, deny access early
    if (!userId) {
      setHasAccess(false);
      return;
    }

    // Function to check if the user has access
    const checkAccess = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/page_access/${userId}/${pageId}`
        );

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

  // PAGE ACCESS SCRIPT ------------------------ LOWER PART --- START

  // If hasAccess is still null, show a loading state
  if (hasAccess === null) {
    return <div>Loading access information...</div>;
  }

  // Deny access if hasAccess is false
  if (!hasAccess) {
    return (
      <div>
        You do not have access to this page. Contact the administrator to
        request access.
      </div>
    );
  }

  // PAGE ACCESS SCRIPT ------------------------ LOWER PART --- END
  // PDS3 SCRIPT  START --------------------------------------------------------------------------------------------

  return (
    <>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell>{item.id}</TableCell>
          <div
            style={{
              border: '1px solid black',
              padding: '0.25in',
              width: '8in',
            }}
          >
            <table
              style={{
                border: '1px solid black',
                borderCollapse: 'collapse',
                fontFamily: 'Arial, Helvetica, sans-serif',
                width: '8in',
                tableLayout: 'fixed',
              }}
            >
              <tbody>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.2in',
                      fontSize: '72.5%',
                      backgroundColor: 'gray',
                      color: 'white',
                    }}
                  >
                    <b>
                      <i>
                        VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC /
                        NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S
                      </i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    29.
                  </td>
                  <td
                    colSpan="6"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    NAME & ADDRESS OF ORGANIZATION
                    <br />
                    (Write in full)
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.2in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    INCLUSIVE DATES
                    <br />
                    (mm/dd/yyyy)
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '50%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    NUMBER OF
                    <br />
                    HOURS
                  </td>
                  <td
                    colSpan="5"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    POSITION / NATURE OF WORK
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    From
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    To
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.nameAndAddress}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.dateFrom}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.dateTo}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.numberOfHours}
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      color: 'red',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    <b>
                      <i>(Continue on separate sheet if necessary)</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.2in',
                      fontSize: '72.5%',
                      backgroundColor: 'gray',
                      color: 'white',
                    }}
                  >
                    <b>
                      <i>
                        VII. LEARNING AND DEVELOPMENT (L&D)
                        INTERVENTIONS/TRAINING PROGRAMS ATTENDED
                      </i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.5in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    30.
                  </td>
                  <td
                    colSpan="6"
                    rowSpan="2"
                    style={{
                      height: '0.5in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                    PROGRAMS
                    <br />
                    (Write in full)
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.4in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    INCLUSIVE DATES OF
                    <br />
                    ATTENDANCE
                    <br />
                    (mm/dd/yyyy)
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.5in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    NUMBER OF
                    <br />
                    HOURS
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.5in',
                      fontSize: '50%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    Type of LD
                    <br />
                    (Managerial/ Supervisory/
                    <br />
                    Technical/etc)
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.5in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    CONDUCTED/ SPONSORED BY
                    <br />
                    (Write in full)
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    From
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    To
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      color: 'red',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    <b>
                      <i>(Continue on separate sheet if necessary)</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.3in',
                      fontSize: '72.5%',
                      backgroundColor: 'gray',
                      color: 'white',
                    }}
                  >
                    <b>
                      <i>VIII. OTHER INFORMATION</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    31.
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.3in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    SPECIAL SKILLS and HOBBIES
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    32.
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    NON-ACADEMIC DISTINCTIONS / RECOGNITION
                    <br />
                    (Write in full)
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    33.
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.3in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    MEMBERSHIP IN ASSOCIATION/ORGANIZATION
                    <br />
                    (Write in full)
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="7"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      backgroundColor: 'lightgray',
                      color: 'red',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    <b>
                      <i>(Continue on separate sheet if necessary)</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    <b>
                      <i>SIGNATURE</i>
                    </b>
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    <b>
                      <i>DATE</i>
                    </b>
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="15"
                    style={{
                      height: '0.1in',
                      fontSize: '50%',
                      border: '1px solid white',
                      textAlign: 'right',
                    }}
                  >
                    <i>CS FORM 212 (Revised 2017), Page 3 of 4</i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TableRow>
      ))}
    </>
  );
};

export default Pds3;
