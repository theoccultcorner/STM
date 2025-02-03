import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import logo from '../STM.png'; // Adjust the path if needed

const HomePage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '#FFFFFF', // Light gray background
        padding: '20px',
      }}
    >
      {/* Slightly Bigger Centered Logo */}
      <img
        src={logo}
        alt="Sharing The Message Logo"
        style={{
          width: "200px", // Slightly bigger size
          height: "200px",
          marginBottom: "20px",
        }}
      />

      {/* Welcome Message */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
        Welcome to Sharing The Message
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '600px', marginTop: '10px', color: 'black' }}>
        A Narcotics Anonymous group dedicated to hope, recovery, and sharing the message of healing.
        No matter where you are in your journey, you're not alone.
      </Typography>

      {/* Button Container */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        {/* Find a Meeting Button */}
        <Button
          onClick={() => navigate('/calender')} // Navigate to Calendar component
          variant="contained"
          sx={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            '&:hover': { backgroundColor: 'darkblue' },
          }}
        >
          Find a Meeting
        </Button>

      </Box>
      
    </Box>
  );
};

export default HomePage;
