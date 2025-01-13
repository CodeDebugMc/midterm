import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableCell, TableRow } from '@mui/material';

const Pds2 = () => {
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:5000/work-experience');
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
    const pageId = 22; // The page ID for the Profile

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

  // PDS2 SCRIPT  START --------------------------------------------------------------------------------------------

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
              <tr>
                <td
                  colSpan="18"
                  style={{
                    height: '0.2in',
                    fontSize: '72.5%',
                    backgroundColor: 'gray',
                    color: 'white',
                  }}
                >
                  <b>
                    <i>IV. CIVIL SERVICE ELIGIBILITY</i>
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
                    border: '1px 1px1px 0px solid black',
                  }}
                >
                  27.
                </td>
                <td
                  colSpan="5"
                  rowSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    backgroundColor: 'lightgray',
                    border: '1px 0px 1px 1px solid black',
                    textAlign: 'center',
                  }}
                >
                  CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER
                  <br />
                  SPECIAL LAWS/ CES/ CSEE
                  <br />
                  BARANGAY ELIGIBILITY / DRIVER'S LICENSE
                </td>
                <td
                  colSpan="2"
                  rowSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  RATING
                  <br />
                  (If Applicable)
                </td>
                <td
                  colSpan="2"
                  rowSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  DATE OF
                  <br />
                  EXAMINATION /<br />
                  CONFERMENT
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
                  PLACE OF EXAMINATION / CONFERMENT
                </td>
                <td
                  colSpan="3"
                  style={{
                    height: '0.1in',
                    fontSize: '55%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  LICENSE (if applicable)
                </td>
              </tr>

              <tr>
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
                  NUMBER
                </td>
                <td
                  colSpan="1"
                  style={{
                    height: '0.2in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  Date of
                  <br />
                  Validity
                </td>
              </tr>

              {Array(7)
                .fill()
                .map((_, index) => (
                  <tr key={index}>
                    <td
                      colSpan="6"
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
                        fontSize: '52.5%',
                        border: '1px solid black',
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      colSpan="2"
                      style={{
                        height: '0.25in',
                        fontSize: '52.5%',
                        border: '1px solid black',
                      }}
                    >
                      &nbsp;
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
                  </tr>
                ))}

              <tr>
                <td
                  colSpan="18"
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
                  colSpan="18"
                  style={{
                    height: '0.55in',
                    fontSize: '70%',
                    backgroundColor: 'gray',
                    color: 'white',
                  }}
                >
                  <b>
                    <i>
                      V. WORK EXPERIENCE
                      <br />
                      (Include private employment. Start from your recent work)
                      Description of duties should be indicated in the attached
                      Work Experience sheet.
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
                    border: '1px 1px1px 0px solid black',
                  }}
                >
                  28.
                </td>
                <td
                  colSpan="3"
                  rowSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px 0px 1px 1px solid black',
                    textAlign: 'center',
                  }}
                >
                  INCLUSIVE DATES
                  <br />
                  (mm/dd/yyyy)
                </td>
                <td
                  colSpan="4"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  POSITION TITLE
                  <br />
                  (Write in full/Do not abbreviate)
                </td>
                <td
                  colSpan="4"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  DEPARTMENT / AGENCY / OFFICE / COMPANY <br />
                  (Write in full/Do not abbreviate)
                </td>
                <td
                  colSpan="1"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  MONTHLY
                  <br />
                  SALARY
                </td>
                <td
                  colSpan="2"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '50%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  SALARY/ JOB/
                  <br />
                  PAY GRADE (if
                  <br />
                  applicable)&
                  <br />
                  STEP (Format
                  <br />
                  "00-0")/
                  <br />
                  INCREMENT
                </td>
                <td
                  colSpan="2"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  STATUS OF
                  <br />
                  APPOINTMENT
                </td>
                <td
                  colSpan="1"
                  rowSpan="3"
                  style={{
                    height: '0.3in',
                    fontSize: '55%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  GOV'T
                  <br />
                  SERVICE
                  <br />
                  (Y/N)
                </td>
              </tr>
              <tr></tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                    textAlign: 'center',
                  }}
                >
                  From
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  THIS IS
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &npsb;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
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
                  colSpan="2"
                  style={{
                    height: '0.3in',
                    fontSize: '52.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>
                <td
                  colSpan="2"
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
              </tr>
              <tr>
                <td
                  colSpan="18"
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
                  colSpan="3"
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
                  colSpan="18"
                  style={{
                    height: '0.1in',
                    fontSize: '50%',
                    border: '1px solid white',
                    textAlign: 'right',
                  }}
                >
                  <i>CS FORM 212 (Revised 2017), Page 2 of 4</i>
                </td>
              </tr>
            </table>
          </div>
        </TableRow>
      ))}
    </>
  );
};

export default Pds2;
