import React from "react";
import { Box, Typography, Button, Card, CardContent, Divider } from "@mui/material";
import logo from '../Logo2.png';

const CCRNA = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
        paddingBottom: "40px", // Ensures padding at the bottom
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          backgroundColor: "#FFC107",
          padding: "20px",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ color: "#4E342E", fontWeight: "bold" }}>
          CENTRAL CALIFORNIA REGIONAL CONVENTION OF NARCOTICS ANONYMOUS
        </Typography>
      </Box>

      {/* Main Section */}
      <Card
        sx={{
          maxWidth: 800,
          margin: "20px auto",
          padding: "20px",
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            WELCOME!
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            CCRNA XXXIII
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            February 21 - 23, 2025
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: "italic", marginBottom: 2 }}>
            The Steps Link Us To Freedom
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Central California Regional Convention of Narcotics Anonymous
            <br />
            Marriott Hotel and Mechanics Bank Arena, 801 Truxtun Ave., Bakersfield
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "red", fontWeight: "bold", marginBottom: 2 }}
          >
            Please Come Join Us!
          </Typography>
          <Typography variant="caption" display="block" sx={{ marginBottom: 2 }}>
            Registration opens at Noon on February 21st in Bakersfield!
          </Typography>
          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={logo}
              alt="CCRCNA Logo"
              style={{
                width: "300px",
                height: "auto",
                marginBottom: "10px",
              }}
            />
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              “The Steps are our solution. They are our survival kit.”
              <br />
              Basic Text, pg 19
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC107",
              color: "#4E342E",
              fontWeight: "bold",
              marginBottom: 2,
              "&:hover": { backgroundColor: "#FFB300" },
            }}
          >
            VOLUNTEER
          </Button>
          <Typography variant="body2" sx={{ fontStyle: "italic", marginBottom: 2 }}>
            We have opportunities available! Give back what was so freely given to you!
          </Typography>
        </CardContent>
      </Card>

      {/* Footer Section */}
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4, // Adds extra margin at the bottom
          textAlign: "center",
          fontSize: "0.9rem",
          color: "gray",
        }}
      >
        <Typography variant="body2">
          Central California Convention & Events, Inc.
          <br />
          237 Town Center West, Ste 125
          <br />
          Santa Maria, CA 93458
        </Typography>
      </Box>
    </Box>
  );
};

export default CCRNA;
