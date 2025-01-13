// src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Store token and userId in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId); // Store userId
      console.log('User ID stored in localStorage:', response.data.userId); // Log for confirmation
      
      navigate('/voluntary-works'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          bgcolor: 'background.paper',
          boxShadow: 3,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>Login</Typography>
        
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/" color="primary">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
