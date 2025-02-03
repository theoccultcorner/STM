import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../Logo1.png'; // Adjust the path if needed

const AboutPage = () => {
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
      {/* Centered Logo */}
      <img
        src={logo}
        alt="Logo"
        style={{
          width: '150px', // Adjust size as needed
          height: 'auto',
          marginBottom: '20px',
        }}
      />

      {/* Page Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        About Us
      </Typography>

      {/* Description Text */}
      <Typography variant="body1" sx={{ maxWidth: '600px',  marginBottom: '20px' }}>
      At Sharing The Message, we are a Narcotics Anonymous group dedicated to carrying the message of hope and recovery to the addict who still suffers. We believe in the spiritual principle that "an addict, any addict, can stop using drugs, lose the desire to use, and find a new way to live." Our group is a safe and welcoming space where no addict need ever feel alone again. Through the NA program, the Twelve Steps, and the power of one addict helping another, we walk this journey of recovery together, free from active addiction. Whether you're new to recovery, returning, or simply seeking support, you are welcome here. As the Basic Text reminds us, "We are not alone. The therapeutic value of one addict helping another is without parallel." You never have to use again—there is hope, and we are here to share it with you.
      </Typography>
    </Box>
  );
};

export default AboutPage;
