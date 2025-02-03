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
        backgroundColor: '#FFFFFF',
        padding: '20px',
      }}
    >
      <img
        src={logo}
        alt="Sharing The Message Logo"
        style={{
          width: "200px",
          height: "200px",
          marginBottom: "20px",
        }}
      />

      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'black' }}>
        Welcome to Sharing The Message
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '600px', marginTop: '10px', color: 'black' }}>
        A Narcotics Anonymous group dedicated to hope, recovery, and sharing the message of healing.
        No matter where you are in your journey, you're not alone.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Button
          onClick={() => navigate('/calender')}
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

        <Button
          onClick={() => navigate('/ccrna')}
          variant="contained"
          sx={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            '&:hover': { backgroundColor: 'darkorange' },
          }}
        >
          CCRNA
        </Button>

        {/* GSR Report Button */}
        <Button
          onClick={() => navigate('/gsrreport')}
          variant="contained"
          sx={{
            backgroundColor: 'green',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            '&:hover': { backgroundColor: 'darkgreen' },
          }}
        >
          GSR Report
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
