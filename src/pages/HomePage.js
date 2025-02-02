import React from 'react';
import logo from '../STM.png'; // Adjust the path if needed
import { Box, Typography, Button } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        backgroundColor: '000000', // Light gray background
        padding: '20px',
      }}
    >
      {/* Slightly Bigger Centered Logo */}
      <img
        src={logo}
        alt="Sharing The Message Logo"
        style={{
          width: "120px", // Slightly bigger size
          height: "120px",
          marginBottom: "20px",
        }}
      />

      {/* Welcome Message */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
        Welcome to Sharing The Message
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '600px', marginTop: '10px' }}>
        A Narcotics Anonymous group dedicated to hope, recovery, and sharing the message of healing. 
        No matter where you are in your journey, you're not alone.
      </Typography>

      {/* CTA Button */}
      <Button
        href="/meetings"
        variant="contained"
        sx={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          marginTop: '20px',
          '&:hover': { backgroundColor: 'darkblue' },
        }}
      >
        Find a Meeting
      </Button>
    </Box>
  );
};

export default HomePage;
