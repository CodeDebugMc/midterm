import React, { useEffect, useState } from "react";
import axios from "axios";
const Pds4 = () => {




    
      // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START
      
      const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state
      
      useEffect(() => {
          // Retrieve userId from localStorage (make sure this exists and is correct)
          const userId = localStorage.getItem('userId');
          const pageId = 24; // The page ID for the Profile
      
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
    
      
      
      
        // PDS4 SCRIPT  START --------------------------------------------------------------------------------------------
    


  return (
    <div style={{ border: '1px solid black', padding: '0.25in', width: '8in' }}>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '8in', tableLayout: 'fixed' }}>
        <tbody>
          <tr>
            <td colSpan="12" style={{ height: '1in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              34.&emsp;&emsp;Are you related by consanguinity or affinity to the appointing or recommending authority, or to the<br />
              &emsp;&emsp;&emsp; chief of bureau or office or to the person who has immediate supervision over you in the Office,<br />
              &emsp;&emsp;&emsp; Bureau or Department where you will be appointed,<br />
              <br />
              &emsp;&emsp;&emsp; a. within the third degree?<br />
              <br />
              &emsp;&emsp;&emsp; b. within the fourth degree (for Local Government Unit - Career Employees)?<br />
              <br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '1in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              &emsp;&emsp;If YES, give details:<br />
              &emsp;&emsp;_________________________<br />
              <br />
            </td>
          </tr>
          <tr>
            <td colSpan="12" rowSpan="2" style={{ height: '1.5in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              35.&emsp;&emsp;a. Have you ever been found guilty of any administrative offense?<br />
              <br />
              <br />
              <br />
              <br />
              <br />
              &emsp;&emsp;&emsp;    b. Have you been criminally charged before any court?<br />
              <br />
              <br />
              <br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '0.75in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              &emsp;&emsp;If YES, give details:<br />
              &emsp;&emsp;_________________________
            </td>
          </tr>
          <tr>
            <td colSpan="6" style={{ height: '0.75in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              &emsp;&emsp;If YES, give details:<br />
              <br />
              &emsp;&emsp;&emsp;&emsp;&emsp;Date Filed: _____________<br />
              &emsp;&emsp;Status of Case/s: _____________
            </td>
          </tr>
          <tr>
            <td colSpan="12" style={{ height: '0.5in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              <br />
              36.&emsp;&emsp;Have you ever been convicted of any crime or violation of any law, decree, ordinance or<br />
              &emsp;&emsp;&emsp; regulation by any court or tribunal?<br />
              <br />
              <br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '0.5in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              &emsp;&emsp;If YES, give details:<br />
              &emsp;&emsp;_________________________
            </td>
          </tr>
          <tr>
            <td colSpan="12" style={{ height: '0.5in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              <br />
              37.&emsp;&emsp;Have you ever been separated from the service in any of the following modes: resignation,<br />
              &emsp;&emsp;&emsp; retirement, dropped from the rolls, dismissal, termination, end of term, finished contract or phased<br />
              &emsp;&emsp;&emsp; out (abolition) in the public or private sector?<br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '0.5in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              &emsp;&emsp;If YES, give details:<br />
              &emsp;&emsp;_________________________
            </td>
          </tr>
          <tr>
            <td colSpan="12" style={{ height: '1.05in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              38.&emsp;&emsp;a. Have you ever been a candidate in a national or local election held within the last year (except<br />
              &emsp;&emsp;&emsp; Barangay election)?<br />
              <br />
              <br />
              &emsp;&emsp;&emsp;  b. Have you resigned from the government service during the three (3)-month period before the<br />
              &emsp;&emsp;&emsp; last election to promote/actively campaign for a national or local candidate?<br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '1in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              <br />
              &emsp;&emsp;If YES, give details:  _____________________<br />
              <br />
              <br />
              <br />
              &emsp;&emsp;If YES, give details:  _____________________<br />
            </td>
          </tr>
          <tr>
            <td colSpan="12" style={{ height: '0.5in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              <br />
              39.&emsp;&emsp;Have you acquired the status of an immigrant or permanent resident of another country?<br />
              <br />
              <br />
              <br />
            </td>
            <td colSpan="6" style={{ height: '0.5in', fontSize: '62.5%', border: '1px solid black' }}>
              <br />
              <br />
              &emsp;&emsp;If YES, give details (country):<br />
              &emsp;&emsp;_________________________
            </td>
          </tr>
          <tr>
            <td colSpan="12" style={{ height: '0.7in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
              40.&emsp;&emsp;Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA<br />
              &emsp;&emsp;&emsp; 7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:<br />
              <br />
              &emsp;&emsp;&emsp;  a. Are you a member of any indigenous group?<br />
              <br />
              <br />
              &emsp;&emsp;&emsp;  b. Are you a person with disability?<br />
              <br />
              <br />
              &emsp;&emsp;&emsp;  c. Are you a solo parent?<br />
              <br />
              <br />
              <br />
            </td>
          <td colSpan="6" style={{ height: '0.5in', fontSize: '62.5%', border: '1px solid black' }}>
            <br />
            <br />
            &emsp;&emsp;If YES, please specify:  _____________________<br />
            <br />
            <br />
            <br />
            &emsp;&emsp;If YES, please specify ID No:&emsp;&emsp;____________<br />
            <br />
            <br />
            <br />
            &emsp;&emsp;If YES, please specify Id No:&emsp;&emsp;____________<br />
            <br />
          </td>
        </tr>
        <tr>
          <td colSpan="14" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            41.&emsp;&emsp; REFERENCES <font color="red">(Person not related by consanguinity or affinity to applicant /appointee)</font>
          </td>
          <td colSpan="4" rowSpan="6" style={{ height: '0.1in', fontSize: '62.5%', border: '1px solid black', textAlign: 'center' }}>
            <div style={{ border: '1px solid black', width: '3.5cm', height: '4.5cm', position: 'relative', left: '17.5px', top: '7.5px', textAlign: 'center' }}>
              <br />
              ID picture taken within<br />
              the last 6 months<br />
              4.5 cm. X 3.5 cm<br />
              (passport size)<br />
              <br />
              <br />
              Computer generated<br />
              or photocopied picture<br />
              is not acceptable
            </div>
            <br />
            PHOTO<br />
            <br />
          </td>
        </tr>
        <tr>
          <td colSpan="7" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            NAME
          </td>
          <td colSpan="5" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            ADDRESS
          </td>
          <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            TEL. NO.
          </td>
        </tr>
        {[...Array(3)].map((_, index) => (
          <tr key={index}>
            <td colSpan="7" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
              &nbsp;
            </td>
            <td colSpan="5" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
              &nbsp;
            </td>
            <td colSpan="2" style={{ height: '0.25in', fontSize: '62.5%', border: '1px solid black' }}>
              &nbsp;
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="14" style={{ height: '0.6in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black' }}>
            42.&emsp;&emsp;I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and<br />
            &emsp;&emsp;&emsp; complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the<br />
            &emsp;&emsp;&emsp; Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein.<br />
            &emsp;&emsp;&emsp; I agree that any misrepresentation made in this document and its attachments shall cause the filing of<br />
            &emsp;&emsp;&emsp; administrative/criminal case/s against me.
          </td>
        </tr>

        <tr>
          <td colSpan="18" style={{ height: '1.35in', fontSize: '47.5%', border: '0px 1px 0px 1px solid black' }}>
            <div style={{ position: 'relative', top: '0.06in', left: '0.1in', float: 'left' }}>
              <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '2.9in', height: '1in', tableLayout: 'fixed' }}>
                <tr>
                  <td style={{ height: '0.35in', fontSize: '47.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
                    Government Issued ID (i.e.Passport, GSIS, SSS, PRC, Driver's<br />
                    License, etc.) PLEASE INDICATE ID Number and Date of Issuance
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.25in', fontSize: '55%', border: '1px solid black' }}>
                    &emsp;Government Issued ID:
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.25in', fontSize: '55%', border: '1px solid black' }}>
                    &emsp;ID/License/Passport No:
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.25in', fontSize: '55%', border: '1px solid black' }}>
                    &emsp;Date/Place of Issuance:
                  </td>
                </tr>
              </table>
            </div>

            <div style={{ position: 'relative', top: '0.08in', left: '0.3in', float: 'left' }}>
              <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '2.9in', height: '1in', tableLayout: 'fixed' }}>
                <tr>
                  <td style={{ height: '0.6in', fontSize: '55%', border: '1px solid black', textAlign: 'center' }}>
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.1in', fontSize: '55%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
                    Signature (Sign inside the box)
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.2in', fontSize: '55%', border: '1px solid black' }}>
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.1in', fontSize: '55%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
                    Date Accomplished
                  </td>
                </tr>
              </table>
            </div>

            <div style={{ position: 'relative', top: '-0.05in', left: '-0.15in', float: 'right' }}>
              <table style={{ border: '1px solid black', borderCollapse: 'collapse', fontFamily: 'Arial, Helvetica, sans-serif', width: '1.5in', height: '1in', tableLayout: 'fixed' }}>
                <tr>
                  <td style={{ height: '1in', fontSize: '55%', border: '1px solid black', textAlign: 'center' }}>
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td style={{ height: '0.2in', fontSize: '55%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
                    Right Thumbmark
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="18" style={{ height: '1px', fontSize: '0%', backgroundColor: 'black', border: '0px solid white' }}>
          </td>
        </tr>
        <tr>
          <td colSpan="18" style={{ height: '0.2in', fontSize: '62.5%', border: '1px 1px 0px 1px solid black', textAlign: 'center' }}>
            <br />
            SUBSCRIBED AND SWORN to before me this ____________ , affiant exhibiting his/her validly issued government ID as indicated above.<br />
            <br />
          </td>
        </tr>
        <tr>
          <td colSpan="6" rowSpan="3" style={{ height: '0.7in', fontSize: '62.5%', border: '0px 1px 1px1px solid black' }}>
            &nbsp;
          </td>
          <td colSpan="6" style={{ height: '0.5in', fontSize: '62.5%', border: '1px solid black' }}>
            &nbsp;
          </td>
          <td colSpan="6" rowSpan="3" style={{ height: '0.6in', fontSize: '62.5%', border: '0px 1px 1px1px solid black' }}>
            &nbsp;
          </td>
        </tr>
        <tr>
          <td colSpan="6" style={{ height: '0.1in', fontSize: '62.5%', backgroundColor: 'lightgray', border: '1px solid black', textAlign: 'center' }}>
            Person Administering Oath
          </td>
        </tr>
        <tr>
          <td colSpan="6" style={{ height: '0.1in', fontSize: '62.5%', border: '1px solid white', textAlign: 'center' }}>
            &nbsp;
          </td>
        </tr>
        <tr>
          <td colSpan="18" style={{ height: '1px', fontSize: '0%', backgroundColor: 'black', border: '0px solid white' }}>
          </td>
        </tr>
        <tr>
          <td colSpan="18" style={{ height: '0.1in', fontSize: '50%', border: '1px solid white', textAlign: 'right' }}>
            <i>CS FORM 212 (Revised 2017), Page 4 of 4</i>
          </td>
        </tr>

        </tbody>
      </table>
    </div>
  );
};

export default Pds4;

