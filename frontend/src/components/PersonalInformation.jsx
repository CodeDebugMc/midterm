import { useEffect, useState } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const PersonalInformation = () => {
  // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START

  const [hasAccess, setHasAccess] = useState(null); // Updated to null to show loading state

  useEffect(() => {
    // Retrieve userId from localStorage (make sure this exists and is correct)
    const userId = localStorage.getItem('userId');
    const pageId = 13; // The page ID for the Profile

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

  // LEARNING AND DEVELOPMENT SCRIPT  START --------------------------------------------------------------------------------------------

  const [data, setData] = useState([]); // To hold voluntary-work data
  const [firstName, setNewFirstName] = useState(''); // To hold input for new nameAndAddress
  const [middleName, setNewMiddleName] = useState(''); // To hold input for new dateFrom
  const [lastName, setNewLastName] = useState(''); // To hold input for new dateTo
  const [birthDate, setNewBirthDate] = useState(''); // To hold input for new numberOfHours
  const [civilStatus, setNewCivilStatus] = useState(''); // To hold input for new numberOfWorks
  const [heightM, setNewHeightM] = useState('');
  const [weightKg, setNewWeightKg] = useState('');
  const [bloodType, setNewBloodType] = useState('');
  const [gsisNum, setNewGsisNum] = useState('');
  const [pagibigNum, setNewPagibigNum] = useState('');
  const [philhealthNum, setNewPhilhealthNum] = useState('');
  const [sssNum, setNewSssNum] = useState('');
  const [tinNum, setNewTinNum] = useState('');
  const [agencyEmployeeNum, setNewAgencyEmployeeNum] = useState('');
  const [houseBlockLotNum, setNewHouseBlockLotNum] = useState('');
  const [streetName, setNewStreetName] = useState('');
  const [subdivisionOrVillage, setNewSubdivisionOrVillage] = useState('');
  const [barangayName, setNewBarangayName] = useState('');
  const [cityOrMunicipality, setNewCityOrMunicipality] = useState('');
  const [provinceName, setNewProvinceName] = useState('');
  const [zipcode, setNewZipcode] = useState('');
  const [telephone, setNewTelephone] = useState('');
  const [mobileNum, setNewMobileNum] = useState('');
  const [emailAddress, setNewEmailAddress] = useState('');
  const [spouseFirstName, setNewSpouseFirstName] = useState('');
  const [spouseMiddleName, setNewSpouseMiddleName] = useState('');
  const [spouseLastName, setNewSpouseLastName] = useState('');
  const [spouseNameExtension, setNewSpouseNameExtension] = useState('');
  const [spouseOccupation, setNewSpouseOccupation] = useState('');
  const [spouseEmployerBusinessName, setNewSpouseEmployerBusinessName] =
    useState('');
  const [spouseBusinessAddress, setNewSpouseBusinessAddress] = useState('');
  const [spouseTelephone, setNewSpouseTelephone] = useState('');
  const [fatherFirstName, setNewFatherFirstName] = useState('');
  const [fatherMiddleName, setNewFatherMiddleName] = useState('');
  const [fatherLastName, setNewFatherLastName] = useState('');
  const [fatherNameExtension, setNewFatherNameExtension] = useState('');
  const [motherMaidenFirstName, setNewMotherMaidenFirstName] = useState('');
  const [motherMaidenMiddleName, setNewMotherMaidenMiddleName] = useState('');
  const [motherMaidenLastName, setNewMotherMaidenLastName] = useState('');
  const [elementaryNameOfSchool, setNewElementaryNameOfSchool] = useState('');
  const [elementaryDegree, setNewElementaryDegree] = useState('');
  const [elementaryPeriodFrom, setNewElementaryPeriodFrom] = useState('');
  const [elementaryPeriodTo, setNewElementaryPeriodTo] = useState('');
  const [elementaryHighestAttained, setNewElementaryHighestAttained] =
    useState('');
  const [elementaryYearGraduated, setNewElementaryYearGraduated] = useState('');
  const [
    elementaryScholarshipAcademicHonorsReceived,
    setNewElementaryScholarshipAcademicHonorsReceived,
  ] = useState('');
  const [secondaryNameOfSchool, setNewSecondaryNameOfSchool] = useState('');
  const [secondaryDegree, setNewSecondaryDegree] = useState('');
  const [secondaryPeriodFrom, setNewSecondaryPeriodFrom] = useState('');
  const [secondaryPeriodTo, setNewSecondaryPeriodTo] = useState('');
  const [secondaryHighestAttained, setNewSecondaryHighestAttained] =
    useState('');
  const [secondaryYearGraduated, setNewSecondaryYearGraduated] = useState('');
  const [
    secondaryScholarshipAcademicHonorsReceived,
    setNewSecondaryScholarshipAcademicHonorsReceived,
  ] = useState('');

  const [editItem, setEditItem] = useState(null); // To hold item being edited
  const navigate = useNavigate(); // Hook for navigating to different routes
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // Success or error

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(''); // Clear previous messages when a new file is selected
  };

  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!file) {
      setMessage('Please select a file to upload.');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'http://localhost:5000/upload/personal-information',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message || 'File uploaded successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('File upload failed. Please try again.');
      setMessageType('error');
    }
  };
  // Fetch all voluntary-work on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const fetchItems = async () => {
    const response = await axios.get(
      'http://localhost:5000/personal-information'
    );
    setData(response.data);
  };

  // Add new item
  const addItem = async () => {
    if (
      firstName.trim() === '' ||
      middleName.trim() === '' ||
      lastName.trim() === '' ||
      birthDate.trim() === '' ||
      civilStatus.trim() === '' ||
      heightM.trim() === '' ||
      weightKg.trim() === '' ||
      bloodType.trim() === '' ||
      gsisNum.trim() === '' ||
      pagibigNum.trim() === '' ||
      philhealthNum.trim() === '' ||
      sssNum.trim() === '' ||
      tinNum.trim() === '' ||
      agencyEmployeeNum.trim() === '' ||
      houseBlockLotNum.trim() === '' ||
      streetName.trim() === '' ||
      subdivisionOrVillage.trim() === '' ||
      barangayName.trim() === '' ||
      cityOrMunicipality.trim() === '' ||
      provinceName.trim() === '' ||
      zipcode.trim() === '' ||
      telephone.trim() === '' ||
      mobileNum.trim() === '' ||
      emailAddress.trim() === '' ||
      spouseFirstName.trim() === '' ||
      spouseMiddleName.trim() === '' ||
      spouseLastName.trim() === '' ||
      spouseNameExtension.trim() === '' ||
      spouseOccupation.trim() === '' ||
      spouseEmployerBusinessName.trim() === '' ||
      spouseBusinessAddress.trim() === '' ||
      spouseTelephone.trim() === '' ||
      fatherFirstName.trim() === '' ||
      fatherMiddleName.trim() === '' ||
      fatherLastName.trim() === '' ||
      fatherNameExtension.trim() === '' ||
      motherMaidenFirstName.trim() === '' ||
      motherMaidenMiddleName.trim() === '' ||
      motherMaidenLastName.trim() === '' ||
      elementaryNameOfSchool.trim() === '' ||
      elementaryDegree.trim() === '' ||
      elementaryPeriodFrom.trim() === '' ||
      elementaryPeriodTo.trim() === '' ||
      elementaryHighestAttained.trim() === '' ||
      elementaryYearGraduated.trim() === '' ||
      elementaryScholarshipAcademicHonorsReceived.trim() === '' ||
      secondaryNameOfSchool.trim() === '' ||
      secondaryDegree.trim() === '' ||
      secondaryPeriodFrom.trim() === '' ||
      secondaryPeriodTo.trim() === '' ||
      secondaryHighestAttained.trim() === '' ||
      secondaryYearGraduated.trim() === '' ||
      secondaryScholarshipAcademicHonorsReceived.trim() === ''
    )
      return;
    await axios.post('http://localhost:5000/personal-information', {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      birthDate: birthDate,
      civilStatus: civilStatus,
      heightM: heightM,
      weightKg: weightKg,
      bloodType: bloodType,
      gsisNum: gsisNum,
      pagibigNum: pagibigNum,
      philhealthNum: philhealthNum,
      sssNum: sssNum,
      tinNum: tinNum,
      agencyEmployeeNum: agencyEmployeeNum,
      houseBlockLotNum: houseBlockLotNum,
      streetName: streetName,
      subdivisionOrVillage: subdivisionOrVillage,
      barangayName: barangayName,
      cityOrMunicipality: cityOrMunicipality,
      provinceName: provinceName,
      zipcode: zipcode,
      telephone: telephone,
      mobileNum: mobileNum,
      emailAddress: emailAddress,
      spouseFirstName: spouseFirstName,
      spouseMiddleName: spouseMiddleName,
      spouseLastName: spouseLastName,
      spouseNameExtension: spouseNameExtension,
      spouseOccupation: spouseOccupation,
      spouseEmployerBusinessName: spouseEmployerBusinessName,
      spouseBusinessAddress: spouseBusinessAddress,
      spouseTelephone: spouseTelephone,
      fatherFirstName: fatherFirstName,
      fatherMiddleName: fatherMiddleName,
      fatherLastName: fatherLastName,
      fatherNameExtension: fatherNameExtension,
      motherMaidenFirstName: motherMaidenFirstName,
      motherMaidenMiddleName: motherMaidenMiddleName,
      motherMaidenLastName: motherMaidenLastName,
      elementaryNameOfSchool: elementaryNameOfSchool,
      elementaryDegree: elementaryDegree,
      elementaryPeriodFrom: elementaryPeriodFrom,
      elementaryPeriodTo: elementaryPeriodTo,
      elementaryHighestAttained: elementaryHighestAttained,
      elementaryYearGraduated: elementaryYearGraduated,
      elementaryScholarshipAcademicHonorsReceived:
        elementaryScholarshipAcademicHonorsReceived,
      secondaryNameOfSchool: secondaryNameOfSchool,
      secondaryDegree: secondaryDegree,
      secondaryPeriodFrom: secondaryPeriodFrom,
      secondaryPeriodTo: secondaryPeriodTo,
      secondaryHighestAttained: secondaryHighestAttained,
      secondaryYearGraduated: secondaryYearGraduated,
      secondaryScholarshipAcademicHonorsReceived:
        secondaryScholarshipAcademicHonorsReceived,
    });
    setNewFirstName('');
    setNewMiddleName('');
    setNewLastName('');
    setNewBirthDate('');
    setNewCivilStatus('');
    setNewHeightM('');
    setNewWeightKg('');
    setNewBloodType('');
    setNewGsisNum('');
    setNewPagibigNum('');
    setNewPhilhealthNum('');
    setNewSssNum('');
    setNewTinNum('');
    setNewAgencyEmployeeNum('');
    setNewHouseBlockLotNum('');
    setNewStreetName('');
    setNewSubdivisionOrVillage('');
    setNewBarangayName('');
    setNewCityOrMunicipality('');
    setNewProvinceName('');
    setNewZipcode('');
    setNewTelephone('');
    setNewMobileNum('');
    setNewEmailAddress('');
    setNewSpouseFirstName('');
    setNewSpouseMiddleName('');
    setNewSpouseLastName('');
    setNewSpouseNameExtension('');
    setNewSpouseOccupation('');
    setNewSpouseEmployerBusinessName('');
    setNewSpouseBusinessAddress('');
    setNewSpouseTelephone('');
    setNewFatherFirstName('');
    setNewFatherMiddleName('');
    setNewFatherLastName('');
    setNewFatherNameExtension('');
    setNewMotherMaidenFirstName('');
    setNewMotherMaidenMiddleName('');
    setNewMotherMaidenLastName('');
    setNewElementaryNameOfSchool('');
    setNewElementaryDegree('');
    setNewElementaryPeriodFrom('');
    setNewElementaryPeriodTo('');
    setNewElementaryHighestAttained('');
    setNewElementaryYearGraduated('');
    setNewElementaryScholarshipAcademicHonorsReceived('');
    setNewSecondaryNameOfSchool('');
    setNewSecondaryDegree('');
    setNewSecondaryPeriodFrom('');
    setNewSecondaryPeriodTo('');
    setNewSecondaryHighestAttained('');
    setNewSecondaryYearGraduated('');
    setNewSecondaryScholarshipAcademicHonorsReceived('');
    fetchItems();
  };

  // Update item
  const updateItem = async () => {
    if (
      !editItem ||
      editItem.firstName.trim() === '' ||
      editItem.middleName.trim() === '' ||
      editItem.lastName.trim() === '' ||
      editItem.birthDate.trim() === '' || // Convert to string before trimming
      editItem.civilStatus.trim() === '' ||
      editItem.heightM.trim() === '' ||
      editItem.weightKg.trim() === '' ||
      editItem.bloodType.trim() === '' ||
      editItem.gsisNum.trim() === '' ||
      editItem.pagibigNum.trim() === '' ||
      editItem.philhealthNum.trim() === '' ||
      editItem.sssNum.trim() === '' ||
      editItem.tinNum.trim() === '' ||
      editItem.agencyEmployeeNum.trim() === '' ||
      editItem.houseBlockLotNum.trim() === '' ||
      editItem.subdivisionOrVillage.trim() === '' ||
      editItem.barangayName.trim() === '' ||
      editItem.cityOrMunicipality.trim() === '' ||
      editItem.provinceName.trim() === '' ||
      editItem.telephone.trim() === '' ||
      editItem.mobileNum.trim() === '' ||
      editItem.emailAddress.trim() === '' ||
      editItem.spouseFirstName.trim() === '' ||
      editItem.spouseMiddleName.trim() === '' ||
      editItem.spouseLastName.trim() === '' ||
      editItem.spouseNameExtension.trim() === '' ||
      editItem.spouseOccupation.trim() === '' ||
      editItem.spouseEmployerBusinessName.trim() === '' ||
      editItem.spouseBusinessAddress.trim() === '' ||
      editItem.spouseTelephone.trim() === '' ||
      editItem.fatherFirstName.trim() === '' ||
      editItem.fatherMiddleName.trim() === '' ||
      editItem.fatherLastName.trim() === '' ||
      editItem.fatherNameExtension.trim() === '' ||
      editItem.motherMaidenFirstName.trim() === '' ||
      editItem.motherMaidenMiddleName.trim() === '' ||
      editItem.motherMaidenLastName.trim() === '' ||
      editItem.elementaryNameOfSchool.trim() === '' ||
      editItem.elementaryDegree.trim() === '' ||
      editItem.elementaryPeriodFrom.trim() === '' ||
      editItem.elementaryPeriodTo.trim() === '' ||
      editItem.elementaryHighestAttained.trim() === '' ||
      editItem.elementaryYearGraduated.trim() === '' ||
      editItem.elementaryScholarshipAcademicHonorsReceived.trim() === '' ||
      editItem.secondaryNameOfSchool.trim() === '' ||
      editItem.secondaryDegree.trim() === '' ||
      editItem.secondaryPeriodFrom.trim() === '' ||
      editItem.secondaryPeriodTo.trim() === '' ||
      editItem.secondaryHighestAttained.trim() === '' ||
      editItem.secondaryYearGraduated.trim() === '' ||
      editItem.secondaryScholarshipAcademicHonorsReceived.trim() === ''
    )
      return;

    await axios.put(
      `http://localhost:5000/personal-information/${editItem.id}`,
      {
        firstName: editItem.firstName,
        middleName: editItem.middleName,
        lastName: editItem.lastName,
        birthDate: editItem.birthDate,
        civilStatus: editItem.civilStatus, // Ensure it's a string
        heightM: editItem.heightM,
        weightKg: editItem.weightKg,
        bloodType: editItem.bloodType,
        gsisNum: editItem.gsisNum,
        pagibigNum: editItem.pagibigNum,
        philhealthNum: editItem.philhealthNum,
        sssNum: editItem.sssNum,
        tinNum: editItem.tinNum,
        agencyEmployeeNum: editItem.agencyEmployeeNum,
        houseBlockLotNum: editItem.houseBlockLotNum,
        streetName: editItem.streetName,
        subdivisionOrVillage: editItem.subdivisionOrVillage,
        barangayName: editItem.barangayName,
        cityOrMunicipality: editItem.cityOrMunicipality,
        provinceName: editItem.provinceName,
        zipcode: editItem.zipcode,
        telephone: editItem.telephone,
        mobileNum: editItem.mobileNum,
        emailAddress: editItem.emailAddress,
        spouseFirstName: editItem.spouseFirstName,
        spouseMiddleName: editItem.spouseMiddleName,
        spouseLastName: editItem.spouseLastName,
        spouseNameExtension: editItem.spouseNameExtension,
        spouseOccupation: editItem.spouseOccupation,
        spouseEmployerBusinessName: editItem.spouseEmployerBusinessName,
        spouseTelephone: editItem.spouseTelephone,
        fatherFirstName: editItem.fatherFirstName,
        fatherMiddleName: editItem.fatherMiddleName,
        fatherLastName: editItem.fatherLastName,
        fatherNameExtension: editItem.fatherNameExtension,
        motherMaidenFirstName: editItem.motherMaidenFirstName,
        motherMaidenMiddleName: editItem.motherMaidenMiddleName,
        motherMaidenLastName: editItem.motherMaidenLastName,
        elementaryNameOfSchool: editItem.elementaryNameOfSchool,
        elementaryDegree: editItem.elementaryDegree,
        elementaryPeriodFrom: editItem.elementaryPeriodFrom,
        elementaryPeriodTo: editItem.elementaryPeriodTo,
        elementaryHighestAttained: editItem.elementaryHighestAttained,
        elementaryYearGraduated: editItem.weightKg,
        elementaryScholarshipAcademicHonorsReceived:
          editItem.elementaryScholarshipAcademicHonorsReceived,
        secondaryNameOfSchool: editItem.secondaryNameOfSchool,
        secondaryDegree: editItem.secondaryDegree,
        secondaryPeriodFrom: editItem.secondaryPeriodFrom,
        secondaryPeriodTo: editItem.secondaryPeriodTo,
        secondaryHighestAttained: editItem.secondaryHighestAttained,
        secondaryYearGraduated: editItem.secondaryYearGraduated,
        secondaryScholarshipAcademicHonorsReceived:
          editItem.secondaryScholarshipAcademicHonorsReceived,
      }
    );

    setEditItem(null);
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/personal-information/${id}`);
    fetchItems();
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear authentication (for example, token)
    localStorage.removeItem('authToken'); // Assuming the token is stored in localStorage
    navigate('/login'); // Redirect to login page after logout
  };

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

  return (
    <>
      <Box
        component="form"
        onSubmit={handleFileUpload}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          width: 400,
          margin: 'auto',
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
          <Alert severity={messageType} sx={{ marginTop: 2, width: '100%' }}>
            {message}
          </Alert>
        )}
      </Box>

      <Container>
        <h1>Personal Information Table</h1>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          style={{ float: 'right' }}
        >
          Logout
        </Button>

        {/* Add New Item */}
        <div>
          <TextField
            label="Firstname"
            value={firstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <TextField
            label="Middlename"
            value={middleName}
            onChange={(e) => setNewMiddleName(e.target.value)}
          />
          <TextField
            label="Lastname"
            value={lastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <TextField
            label="Birthdate"
            value={birthDate}
            onChange={(e) => setNewBirthDate(e.target.value)}
          />
          <TextField
            label="Civilstatus"
            value={civilStatus}
            onChange={(e) => setNewCivilStatus(e.target.value)}
          />
          <TextField
            label="Height(m)"
            value={heightM}
            onChange={(e) => setNewHeightM(e.target.value)}
          />

          <TextField
            label="Weight(kg)"
            value={weightKg}
            onChange={(e) => setNewWeightKg(e.target.value)}
          />

          <TextField
            label="Blood type"
            value={bloodType}
            onChange={(e) => setNewBloodType(e.target.value)}
          />
          <TextField
            label="GSIS #"
            value={gsisNum}
            onChange={(e) => setNewGsisNum(e.target.value)}
          />
          <TextField
            label="Pag-ibig #"
            value={pagibigNum}
            onChange={(e) => setNewPagibigNum(e.target.value)}
          />
          <TextField
            label="Philhealth #"
            value={philhealthNum}
            onChange={(e) => setNewPhilhealthNum(e.target.value)}
          />
          <TextField
            label="SSS #"
            value={sssNum}
            onChange={(e) => setNewSssNum(e.target.value)}
          />
          <TextField
            label="TIN #"
            value={tinNum}
            onChange={(e) => setNewTinNum(e.target.value)}
          />
          <TextField
            label="Agency Employee #"
            value={agencyEmployeeNum}
            onChange={(e) => setNewAgencyEmployeeNum(e.target.value)}
          />
          <TextField
            label="House block lot #"
            value={houseBlockLotNum}
            onChange={(e) => setNewHouseBlockLotNum(e.target.value)}
          />
          <TextField
            label="Streetname"
            value={streetName}
            onChange={(e) => setNewStreetName(e.target.value)}
          />
          <TextField
            label="Subdivision or Village"
            value={subdivisionOrVillage}
            onChange={(e) => setNewSubdivisionOrVillage(e.target.value)}
          />
          <TextField
            label="Barangay Name"
            value={barangayName}
            onChange={(e) => setNewBarangayName(e.target.value)}
          />
          <TextField
            label="City or Municipality"
            value={cityOrMunicipality}
            onChange={(e) => setNewCityOrMunicipality(e.target.value)}
          />
          <TextField
            label="Province Name"
            value={provinceName}
            onChange={(e) => setNewProvinceName(e.target.value)}
          />
          <TextField
            label="zipcode"
            value={zipcode}
            onChange={(e) => setNewZipcode(e.target.value)}
          />
          <TextField
            label="Telephone #"
            value={telephone}
            onChange={(e) => setNewTelephone(e.target.value)}
          />
          <TextField
            label="Mobile #"
            value={mobileNum}
            onChange={(e) => setNewMobileNum(e.target.value)}
          />
          <TextField
            label="Email Address"
            value={emailAddress}
            onChange={(e) => setNewEmailAddress(e.target.value)}
          />
          <TextField
            label="Spouse Firstname"
            value={spouseFirstName}
            onChange={(e) => setNewSpouseFirstName(e.target.value)}
          />
          <TextField
            label="Spouse Middlename"
            value={spouseMiddleName}
            onChange={(e) => setNewSpouseMiddleName(e.target.value)}
          />
          <TextField
            label="Spouse Lastname"
            value={spouseLastName}
            onChange={(e) => setNewSpouseLastName(e.target.value)}
          />
          <TextField
            label="Spouse Name Extension"
            value={spouseNameExtension}
            onChange={(e) => setNewSpouseNameExtension(e.target.value)}
          />
          <TextField
            label="Spouse Occupation"
            value={spouseOccupation}
            onChange={(e) => setNewSpouseOccupation(e.target.value)}
          />
          <TextField
            label="Spouse Employer Businessname"
            value={spouseEmployerBusinessName}
            onChange={(e) => setNewSpouseEmployerBusinessName(e.target.value)}
          />
          <TextField
            label="Spouse Business Address"
            value={spouseBusinessAddress}
            onChange={(e) => setNewSpouseBusinessAddress(e.target.value)}
          />
          <TextField
            label="Spouse Telephone"
            value={spouseTelephone}
            onChange={(e) => setNewSpouseTelephone(e.target.value)}
          />
          <TextField
            label="Father Firstname"
            value={fatherFirstName}
            onChange={(e) => setNewFatherFirstName(e.target.value)}
          />
          <TextField
            label="Father Middlename"
            value={fatherMiddleName}
            onChange={(e) => setNewFatherMiddleName(e.target.value)}
          />
          <TextField
            label="Father Lastname"
            value={fatherLastName}
            onChange={(e) => setNewFatherLastName(e.target.value)}
          />
          <TextField
            label="Father Name Extenstion"
            value={fatherNameExtension}
            onChange={(e) => setNewFatherNameExtension(e.target.value)}
          />
          <TextField
            label="Mother Maiden Firstname"
            value={motherMaidenFirstName}
            onChange={(e) => setNewMotherMaidenFirstName(e.target.value)}
          />
          <TextField
            label="Mother Maiden Middlename"
            value={motherMaidenMiddleName}
            onChange={(e) => setNewMotherMaidenMiddleName(e.target.value)}
          />
          <TextField
            label="Mother Maiden Lastname"
            value={motherMaidenLastName}
            onChange={(e) => setNewMotherMaidenLastName(e.target.value)}
          />
          <TextField
            label="Elementary Name of School"
            value={elementaryNameOfSchool}
            onChange={(e) => setNewElementaryNameOfSchool(e.target.value)}
          />
          <TextField
            label="Elementary Degree"
            value={elementaryDegree}
            onChange={(e) => setNewElementaryDegree(e.target.value)}
          />
          <TextField
            label="Elementary Period From"
            value={elementaryPeriodFrom}
            onChange={(e) => setNewElementaryPeriodFrom(e.target.value)}
          />
          <TextField
            label="Elementary Period To"
            value={elementaryPeriodTo}
            onChange={(e) => setNewElementaryPeriodTo(e.target.value)}
          />
          <TextField
            label="Elementary Highest Attained"
            value={elementaryHighestAttained}
            onChange={(e) => setNewElementaryHighestAttained(e.target.value)}
          />
          <TextField
            label="Elementary Year Graduated"
            value={elementaryYearGraduated}
            onChange={(e) => setNewElementaryYearGraduated(e.target.value)}
          />
          <TextField
            label="Elementary Scholarship Academic Honors Received"
            value={elementaryScholarshipAcademicHonorsReceived}
            onChange={(e) =>
              setNewElementaryScholarshipAcademicHonorsReceived(e.target.value)
            }
          />
          <TextField
            label="Secondary Name of School"
            value={secondaryNameOfSchool}
            onChange={(e) => setNewSecondaryNameOfSchool(e.target.value)}
          />
          <TextField
            label="Secondary Degree"
            value={secondaryDegree}
            onChange={(e) => setNewSecondaryDegree(e.target.value)}
          />
          <TextField
            label="Secondary Period From"
            value={secondaryPeriodFrom}
            onChange={(e) => setNewSecondaryPeriodFrom(e.target.value)}
          />
          <TextField
            label="Secondary Period To"
            value={secondaryPeriodTo}
            onChange={(e) => setNewSecondaryPeriodTo(e.target.value)}
          />
          <TextField
            label="Secondary Highest Attained"
            value={secondaryHighestAttained}
            onChange={(e) => setNewSecondaryHighestAttained(e.target.value)}
          />
          <TextField
            label="Secondary Year Graduated"
            value={secondaryYearGraduated}
            onChange={(e) => setNewSecondaryYearGraduated(e.target.value)}
          />
          <TextField
            label="Secondary Scholarship Academic Honors Received"
            value={secondaryScholarshipAcademicHonorsReceived}
            onChange={(e) =>
              setNewSecondaryScholarshipAcademicHonorsReceived(e.target.value)
            }
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
              <TableCell>Firstname</TableCell>
              <TableCell>Middlename</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell>Birthdate</TableCell>
              <TableCell>Civilstatus</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Blood type</TableCell>
              <TableCell>GSIS #</TableCell>
              <TableCell>Pag-ibig #</TableCell>
              <TableCell>Philhealth #</TableCell>
              <TableCell>SSS #</TableCell>
              <TableCell>TIN #</TableCell>
              <TableCell>Agency Employee #</TableCell>
              <TableCell>House block lot #</TableCell>
              <TableCell>Streetname</TableCell>
              <TableCell>Subdivision or Village</TableCell>
              <TableCell>Barangay Name</TableCell>
              <TableCell>City or Municipality</TableCell>
              <TableCell>Province Name</TableCell>
              <TableCell>zipcode</TableCell>
              <TableCell>Telephone #</TableCell>
              <TableCell>Mobile #</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Spouse Firstname</TableCell>
              <TableCell>Spouse Middlename</TableCell>
              <TableCell>Spouse Lastname</TableCell>
              <TableCell>Spouse Name Extension</TableCell>
              <TableCell>Spouse Occupation</TableCell>
              <TableCell>Spouse Employer Businessname</TableCell>
              <TableCell>Spouse Telephone</TableCell>
              <TableCell>Father Firstname</TableCell>
              <TableCell>Father Middlename</TableCell>
              <TableCell>Father Lastname</TableCell>
              <TableCell>Father Name Extenstion</TableCell>
              <TableCell>Mother Maiden Firstname</TableCell>
              <TableCell>Mother Maiden Middlename</TableCell>
              <TableCell>Mother Maiden Lastname</TableCell>
              <TableCell>Elementary Name of School</TableCell>
              <TableCell>Elementary Degree</TableCell>
              <TableCell>Elementary Period From</TableCell>
              <TableCell>Elementary Period To</TableCell>
              <TableCell>Elementary Highest Attained</TableCell>
              <TableCell>Elementary Year Graduated</TableCell>
              <TableCell>
                Elementary Scholarship Academic Honors Received
              </TableCell>
              <TableCell>Secondary Name of School</TableCell>
              <TableCell>Secondary Degree</TableCell>
              <TableCell>Secondary Period From</TableCell>
              <TableCell>Secondary Period To</TableCell>
              <TableCell>Secondary Highest Attained</TableCell>
              <TableCell>Secondary Year Graduated</TableCell>
              <TableCell>
                Secondary Scholarship Academic Honors Received
              </TableCell>
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
                      value={editItem.firstName}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          firstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.firstName
                  )}
                </TableCell>
                {/* cell for the last name */}
                <TableCell>
                  {/* Editable field */}
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.middleName}
                      onChange={(e) =>
                        setEditItem({ ...editItem, middleName: e.target.value })
                      }
                    />
                  ) : (
                    item.middleName
                  )}
                </TableCell>
                {/* cell for the dateTo */}
                <TableCell>
                  {/* Editable field */}
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.lastName}
                      onChange={(e) =>
                        setEditItem({ ...editItem, lastName: e.target.value })
                      }
                    />
                  ) : (
                    item.lastName
                  )}
                </TableCell>
                {/* cell for the numberOfHours */}
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.birthDate} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          birthDate: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.birthDate
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.civilStatus} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          civilStatus: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.civilStatus
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.heightM} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          heightM: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.heightM
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.weightKg} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          weightKg: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.weightKg
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.bloodType} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          bloodType: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.bloodType
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.gsisNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          gsisNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.gsisNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.pagibigNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          pagibigNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.pagibigNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.philhealthNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          philhealthNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.philhealthNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.sssNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          sssNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.sssNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.tinNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          tinNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.tinNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.agencyEmployeeNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          agencyEmployeeNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.agencyEmployeeNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.houseBlockLotNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          houseBlockLotNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.houseBlockLotNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.streetName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          streetName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.streetName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.subdivisionOrVillage} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          subdivisionOrVillage: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.subdivisionOrVillage
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.barangayName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          barangayName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.barangayName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.cityOrMunicipality} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          cityOrMunicipality: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.cityOrMunicipality
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.provinceName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          provinceName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.provinceName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.zipcode} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          zipcode: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.zipcode
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.telephone} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          telephone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.telephone
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.mobileNum} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          mobileNum: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.mobileNum
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.emailAddress} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          emailAddress: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.emailAddress
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseFirstName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseFirstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseFirstName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseMiddleName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseMiddleName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseMiddleName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseLastName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseLastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseLastName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseNameExtension} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseNameExtension: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseNameExtension
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseOccupation} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseOccupation: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseOccupation
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseEmployerBusinessName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseEmployerBusinessName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseEmployerBusinessName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.spouseTelephone} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          spouseTelephone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.spouseTelephone
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.fatherFirstName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          fatherFirstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.fatherFirstName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.fatherMiddleName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          fatherMiddleName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.fatherMiddleName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.fatherLastName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          fatherLastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.fatherLastName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.fatherNameExtension} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          fatherNameExtension: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.fatherNameExtension
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.motherMaidenFirstName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          motherMaidenFirstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.motherMaidenFirstName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.motherMaidenMiddleName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          motherMaidenMiddleName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.motherMaidenMiddleName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.motherMaidenLastName} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          motherMaidenLastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.motherMaidenLastName
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryNameOfSchool} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryNameOfSchool: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.elementaryNameOfSchool
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryDegree} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryDegree: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.elementaryDegree
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryPeriodFrom} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryPeriodFrom: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.elementaryPeriodFrom)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryPeriodTo} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryPeriodTo: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.elementaryPeriodTo)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryHighestAttained} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryHighestAttained: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.elementaryHighestAttained
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.elementaryYearGraduated} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryYearGraduated: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.elementaryYearGraduated)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={
                        editItem.elementaryScholarshipAcademicHonorsReceived
                      } // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          elementaryScholarshipAcademicHonorsReceived:
                            e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.elementaryScholarshipAcademicHonorsReceived
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryNameOfSchool} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryNameOfSchool: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.secondaryNameOfSchool
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryDegree} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryDegree: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.secondaryDegree
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryPeriodFrom} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryPeriodFrom: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.secondaryPeriodFrom)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryPeriodTo} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryPeriodTo: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.secondaryPeriodTo)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryHighestAttained} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryHighestAttained: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.secondaryHighestAttained
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={editItem.secondaryYearGraduated} // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryYearGraduated: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDate(item.secondaryYearGraduated)
                  )}
                </TableCell>
                <TableCell>
                  {editItem && editItem.id === item.id ? (
                    <TextField
                      value={
                        editItem.secondaryScholarshipAcademicHonorsReceived
                      } // Ensure value is a string
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          secondaryScholarshipAcademicHonorsReceived:
                            e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.secondaryScholarshipAcademicHonorsReceived
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

export default PersonalInformation;
