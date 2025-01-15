import { useEffect, useState } from 'react';
import axios from 'axios';
import { TableCell } from '@mui/material';
const Pds1 = () => {
  const [data, setData] = useState([]);

  const fetchItems = async () => {
    const response = await axios.get(
      'http://localhost:5000/personal-information'
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

  const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

  useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 21; // The page ID for the Profile

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

  // PDS1 SCRIPT  START --------------------------------------------------------------------------------------------

  return (
    <>
      {data.map((item) => (
        <TableCell key={item.id}>
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
                height: '12.5in',
                tableLayout: 'fixed',
              }}
            >
              <thead>
                <tr>
                  <td
                    colSpan="2"
                    style={{ height: '0.1in', fontSize: '72.5%' }}
                  >
                    <b>
                      <i>CS Form No. 212</i>
                    </b>
                  </td>
                  <td
                    colSpan="13"
                    style={{ height: '0.1in', fontSize: '72.5%' }}
                  ></td>
                </tr>
                <tr>
                  <td
                    colSpan="2"
                    style={{ height: '0.1in', fontSize: '62.5%' }}
                  >
                    <b>
                      <i>Revised 2017</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="15" style={{ height: '0.5in' }}>
                    <h1 style={{ textAlign: 'center' }}>
                      <b>PERSONAL DATA SHEET</b>
                    </h1>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan="15"
                    style={{ height: '0.3in', fontSize: '62.5%' }}
                  >
                    <b>
                      <i>
                        WARNING: Any misrepresentation made in the Personal Data
                        Sheet and the Work Experience Sheet shall cause the
                        filing of administrative/criminal case/s against the
                        person concerned.
                      </i>
                    </b>
                    <br />
                    <b>
                      <i>
                        READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA
                        SHEET (PDS) BEFORE ACCOMPLISHING THE PDS FORM.
                      </i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="11" style={{ height: '0.1in', fontSize: '55%' }}>
                    Print legibly. Tick appropriate boxes (□) and use separate
                    sheet if necessary. Indicate N/A if not applicable.{' '}
                    <b>DO NOT ABBREVIATE.</b>
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      backgroundColor: 'gray',
                      border: '1px solid black',
                    }}
                  >
                    1. CS ID No
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '50%',
                      textAlign: 'right',
                      border: '1px solid black',
                    }}
                  >
                    (Do not fill up. For CSC use only)
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
                      <i>I. PERSONAL INFORMATION</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    2.&emsp;SURNAME
                  </td>
                  <td
                    colSpan="12"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.lastName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;FIRST NAME
                  </td>
                  <td
                    colSpan="9"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.firstName}
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.125in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                      backgroundColor: 'lightgray',
                    }}
                  >
                    <sup>NAME EXTENSION (JR, SR)</sup>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.125in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                      backgroundColor: 'lightgray',
                    }}
                  >
                    <sup>{item.spouseNameExtension}</sup>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;MIDDLE NAME
                  </td>
                  <td
                    colSpan="12"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.middleName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    3.&emsp;DATE OF BIRTH
                    <p>&emsp;&emsp;(mm/dd/yyyy)</p>
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.birthDate}
                  </td>
                  <td
                    colSpan="3"
                    rowSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      verticalAlign: 'top',
                    }}
                  >
                    <br />
                    16.&emsp;CITIZENSHIP
                    <br />
                    <br />
                    &emsp;&emsp;If holder of dual citizenship,
                    <br />
                    <br />
                    &emsp;&emsp;please indicate the details
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.middleName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseNameExtension}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    4.&emsp;PLACE OF BIRTH
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.provinceName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    5.&emsp;SEX
                  </td>
                  <td
                    colSpan="5"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseNameExtension}
                  </td>
                </tr>
                {/* Additional rows for other sections */}

                <tr>
                  <td
                    colSpan="3"
                    rowSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      verticalAlign: 'top',
                    }}
                  >
                    <br />
                    6.&emsp;CIVIL STATUS
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.civilStatus}
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      verticalAlign: 'top',
                    }}
                  >
                    <br />
                    17.&emsp;RESIDENTIAL &emsp;&emsp; ADDRESS
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;
                    {item.houseBlockLotNum} &emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;{item.streetName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray white black black',
                      textAlign: 'center',
                    }}
                  >
                    <i>House/Block/Lot No.</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray white black black',
                      textAlign: 'center',
                    }}
                  >
                    <i>Street</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {item.subdivisionOrVillage}&emsp;&emsp;&emsp;&emsp; &emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;{item.barangayName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black black white',
                      textAlign: 'center',
                    }}
                  >
                    <i>Subdivision/Village</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black black white',
                      textAlign: 'center',
                    }}
                  >
                    <i>Barangay</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    7.&emsp;HEIGHT (m)
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.heightM}
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {item.cityOrMunicipality}&emsp;&emsp;&emsp;&emsp; &emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp; &emsp; &emsp; &emsp;
                    {item.provinceName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>City/Municipality</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>Province</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    8.&emsp;WEIGHT (kg)
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.weightKg}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black black gray black',
                      textAlign: 'center',
                    }}
                  >
                    ZIP CODE
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.zipcode}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    9.&emsp;BLOOD TYPE
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.bloodType}
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      verticalAlign: 'top',
                    }}
                  >
                    <br />
                    18.&emsp;PERMANENT&emsp;&emsp; ADDRESS
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;
                    {item.houseBlockLotNum} &emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;{item.streetName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>House/Block/Lot No.</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>Street</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    10.&emsp;GSIS ID NO.
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.gsisNum}
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {item.subdivisionOrVillage}&emsp;&emsp;&emsp;&emsp; &emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;{item.barangayName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>Subdivision/Village</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>Barangay</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    11.&emsp;PAG-IBIG ID NO.
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.pagibigNum}
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.15in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {item.cityOrMunicipality}&emsp;&emsp;&emsp;&emsp; &emsp;
                    &emsp;&emsp;&emsp;&emsp; &emsp;&emsp; &emsp; &emsp; &emsp;
                    {item.provinceName}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>City/Municipality</i>
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.1in',
                      fontSize: '55%',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    <i>Province</i>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    12.&emsp;PHILHEALTH NO.
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.philhealthNum}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid gray black blackblack',
                      textAlign: 'center',
                    }}
                  >
                    ZIP CODE
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.zipcode}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    13.&emsp;SSS NO.
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.sssNum}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '57.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    19.&emsp;TELEPHONE NO.
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp; {item.telephone}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    14.&emsp;TIN NO.
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.tinNum}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    20.&emsp;MOBILE NO.
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.mobileNum}
                  </td>
                </tr>

                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    15.&emsp;AGENCY EMPLOYEE NO.
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.sssNum}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '45%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    21. E-MAIL ADDRESS (if any)
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.emailAddress}
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
                      <i>II. FAMILY BACKGROUND</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    rowSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    22.&emsp;SPOUSE&apos;S SURNAME
                    <br />
                    <br />
                    &emsp;&emsp; FIRST NAME
                    <br />
                    <br />
                    &emsp;&emsp; MIDDLE NAME
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseLastName}
                  </td>
                  <td
                    colSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    23. NAME of CHILDREN (Write full name and list all)
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '52.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    DATE OF BIRTH
                    <br />
                    (mm/dd/yyyy)
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseFirstName}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '47.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      borderBottom: 'none',
                    }}
                  >
                    NAME EXTENSION (JR, SR)
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
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
                      height: '0.125in',
                      fontSize: '52.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      borderTop: 'none',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseMiddleName}
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
                  <td
                    colSpan="2"
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
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    OCCUPATION
                    <br />
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseOccupation}
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
                  <td
                    colSpan="2"
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
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    EMPLOYER/BUSINESS NAME
                    <br />
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseEmployerBusinessName}
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
                  <td
                    colSpan="2"
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
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    BUSINESS ADDRESS
                    <br />
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.spouseBusinessAddress}
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
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>

                <td
                  colSpan="3"
                  style={{
                    height: '0.25in',
                    fontSize: '62.5%',
                    backgroundColor: 'lightgray',
                    border: '1px solid black',
                  }}
                >
                  TELEPHONE NO.
                  <br />
                </td>
                <td
                  colSpan="6"
                  style={{
                    height: '0.25in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &emsp;{item.spouseTelephone}
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
                <td
                  colSpan="2"
                  style={{
                    height: '0.25in',
                    fontSize: '62.5%',
                    border: '1px solid black',
                  }}
                >
                  &nbsp;
                </td>

                <tr>
                  <td
                    colSpan="3"
                    rowSpan="4"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    24. FATHER&apos;S SURNAME
                    <br />
                    <br />
                    &emsp;&emsp;FIRST NAME
                    <br />
                    <br />
                    &emsp;&emsp;MIDDLE NAME
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.fatherLastName}
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
                  <td
                    colSpan="2"
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
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.fatherFirstName}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '47.5%',
                      backgroundColor: 'lightgray',
                      border: '1px 1px 0px 1px solid black',
                    }}
                  >
                    NAME EXTENSION (JR, SR)
                  </td>
                  <td
                    colSpan="4"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
                      fontSize: '52.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      height: '0.125in',
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
                      height: '0.125in',
                      fontSize: '52.5%',
                      backgroundColor: 'lightgray',
                      border: '0px 1px 1px1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.fatherMiddleName}
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
                  <td
                    colSpan="2"
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
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px 1px 0px 1px solid black',
                    }}
                  >
                    25. MOTHER&apos;S MAIDEN NAME
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.motherMaidenMiddleName}
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
                    colSpan="3"
                    rowSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '0px 1px 1px1px solid black',
                    }}
                  >
                    SURNAME
                    <br />
                    <br />
                    FIRST NAME
                    <br />
                    <br />
                    MIDDLE NAME
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.motherMaidenLastName}
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
                  <td
                    colSpan="2"
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
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.motherMaidenFirstName}
                  </td>
                  <td
                    colSpan="4"
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
                </tr>
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.motherMaidenMiddleName}
                  </td>
                  <td
                    colSpan="6"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
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
                      <i>III. EDUCATIONAL BACKGROUND</i>
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
                    26.
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px 0px 1px 1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    LEVEL
                  </td>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '52.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    NAME OF SCHOOL
                    <br />
                    (Write in full)
                  </td>
                  <td
                    colSpan="3"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '50%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    BASIC EDUCATION/DEGREE/COURSE
                    <br />
                    (Write in full)
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '50%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    PERIOD OF
                    <br />
                    ATTENDANCE
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '50%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    HIGHEST LEVEL/
                    <br />
                    UNITS EARNED
                    <br />
                    (if not graduated)
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
                    YEAR
                    <br />
                    GRADUATED
                  </td>
                  <td
                    colSpan="1"
                    rowSpan="2"
                    style={{
                      height: '0.3in',
                      fontSize: '40%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                      textAlign: 'center',
                    }}
                  >
                    SCHOLARSHIP/
                    <br />
                    ACADEMIC
                    <br />
                    HONORS
                    <br />
                    RECEIVED
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.1in',
                      fontSize: '50%',
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
                      fontSize: '50%',
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
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    ELEMENTARY
                    <br />
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.elementaryNameOfSchool}
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.elementaryDegree}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.elementaryPeriodFrom}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.elementaryPeriodTo}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.elementaryHighestAttained}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.elementaryYearGraduated}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.elementaryScholarshipAcademicHonorsReceived}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    SECONDARY
                    <br />
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.secondaryNameOfSchool}
                  </td>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.secondaryDegree}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.secondaryPeriodFrom}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    {item.secondaryPeriodTo}
                  </td>
                  <td
                    colSpan="2"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.secondaryHighestAttained}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.secondaryYearGraduated}
                  </td>
                  <td
                    colSpan="1"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &emsp;{item.secondaryScholarshipAcademicHonorsReceived}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    VOCATIONAL/TRADE COURSE
                    <br />
                  </td>
                  <td
                    colSpan="3"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    COLLEGE
                    <br />
                  </td>
                  <td
                    colSpan="3"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      fontSize: '62.5%',
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      height: '0.25in',
                      fontSize: '62.5%',
                      backgroundColor: 'lightgray',
                      border: '1px solid black',
                    }}
                  >
                    GRADUATE STUDIES
                    <br />
                  </td>
                  <td
                    colSpan="3"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      border: '1px solid black',
                    }}
                  >
                    &nbsp;
                  </td>
                  <td
                    colSpan="1"
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
                      <i>SIGNATURE</i>
                    </b>
                  </td>
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
                    <i>CS FORM 212 (Revised 2017), Page 1 of 4</i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TableCell>
      ))}
    </>
  );
};

export default Pds1;
