import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#000000', // Black background
        color: 'white', // White text
        textAlign: 'center',
        padding: '10px',
      }}
    >
      <Typography variant="body2">
        © 2025 Sharing The Message (STM). All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
