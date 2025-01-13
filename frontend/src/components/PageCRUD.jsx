import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const PageCRUD = () => {

    

    // PAGE ACCESS SCRIPT ------------------------ UPPER PART --- START
    
    useEffect(() => {
        // Retrieve userId from localStorage (make sure this exists and is correct)
        const userId = localStorage.getItem('userId');
        const pageId = 16; // The page ID for the Profile
    
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
    
    
    
    
    
    
    
    
      // PAGE CRUD INFO SCRIPT  START --------------------------------------------------------------------------------------------





    const [pages, setPages] = useState([]);
    const [currentPageId, setCurrentPageId] = useState(null);
    const [pageDescription, setPageDescription] = useState('');
    const [pageGroup, setPageGroup] = useState('');
    const [hasAccess, setHasAccess] = useState(null); // State for access control
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        // Retrieve userId from localStorage (make sure this exists and is correct)
        const userId = localStorage.getItem('userId');
        const pageId = 9; // The page ID for the Profile
        fetchPages(); // Refresh the list upon loading
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



    // Function to fetch all pages from the server
    const fetchPages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pages');
            setPages(response.data);
        } catch (error) {
            console.error('Error fetching pages:', error);
        }
    };

    // Handle form submission for creating or updating a page
    const handleSubmit = async (e) => {
        e.preventDefault();
        const pageData = { page_description: pageDescription, page_group: pageGroup };

        try {
            if (currentPageId) {
                // Update existing page
                await axios.put(`http://localhost:5000/api/pages/${currentPageId}`, pageData);
            } else {
                // Create new page
                await axios.post('http://localhost:5000/api/pages', pageData);
            }
            fetchPages(); // Refresh the list of pages
            resetForm(); // Reset the form after submission
        } catch (error) {
            console.error('Error saving page:', error);
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setCurrentPageId(null);
        setPageDescription('');
        setPageGroup('');
    };

    // Handle the edit action for a page
    const handleEdit = (page) => {
        setCurrentPageId(page.id);
        setPageDescription(page.page_description);
        setPageGroup(page.page_group);
    };

    // Handle the delete action for a page
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/pages/${id}`);
            fetchPages(); // Refresh the list of pages after deletion
        } catch (error) {
            console.error('Error deleting page:', error);
        }
    };




    // If hasAccess is still null, show a loading state
    if (hasAccess === null) {
        return <div>Loading access information...</div>;
    }

    // Deny access if hasAccess is false
    if (!hasAccess) {
        return <div>You do not have access to this page. Contact the administrator to request access.</div>;
    }



    

    return (
        <div>
            <h1>Page CRUD</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Page Description" 
                    value={pageDescription} 
                    onChange={(e) => setPageDescription(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Page Group" 
                    value={pageGroup} 
                    onChange={(e) => setPageGroup(e.target.value)} 
                    required 
                />
                <button type="submit">{currentPageId ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetForm}>Reset</button>
            </form>

            <h2>Pages List</h2>
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        {page.page_description} - {page.page_group} - {page.id}
                        <button onClick={() => handleEdit(page)}>Edit</button>
                        <button onClick={() => handleDelete(page.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageCRUD;
