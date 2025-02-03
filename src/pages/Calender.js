import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const schedule = [
  { time: "9 AM", Sunday: "Ladies\nJaclyn", Monday: "", Tuesday: "", Wednesday: "", Thursday: "", Friday: "", Saturday: "" },
  { time: "12 PM", Sunday: "", Monday: "Murl", Tuesday: "Peanut", Wednesday: "NOON\nMichael B\n2nd Wed Keytags\nStick Meeting", Thursday: "Cambria", Friday: "Quarter", Saturday: "T" },
  { time: "8 PM", Sunday: "Gregory", Monday: "Daniel M.", Tuesday: "Cynthia", Wednesday: "Analeigh", Thursday: "Dinah R.", Friday: "SPAD\nNellie P.", Saturday: "Michael B" },
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Reusable component to render each day and name in a card
const DayCard = ({ day, name }) => (
  <Paper
    sx={{
      padding: 2,
      minHeight: 80,
      textAlign: "center",
      backgroundColor: "#444",
      color: "white",
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 1 }}>
      {day}
    </Typography>
    <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
      {name || "No Meeting"}
    </Typography>
  </Paper>
);

// Component for each section of meetings (e.g., 9 AM, 12 PM, 8 PM)
const MeetingSection = ({ title, meetings }) => (
  <Paper
    sx={{
      marginBottom: 4,
      padding: 3,
      backgroundColor: "#2c2c2c",
      color: "white",
      borderRadius: 2,
      border: "1px solid white",
    }}
  >
    <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 2, textAlign: "center", fontFamily: "'Caveat', cursive" }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {days.map((day) => (
        <Grid item xs={12} sm={6} md={3} lg={2} key={day}>
          <DayCard day={day} name={meetings[0][day]} />
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const Calender = () => {
  // Filter meetings by time slot
  const nineAMMeetings = schedule.filter((slot) => slot.time === "9 AM");
  const noonMeetings = schedule.filter((slot) => slot.time === "12 PM");
  const eightPMMeetings = schedule.filter((slot) => slot.time === "8 PM");

  return (
    <Box sx={{ padding: 3, backgroundColor: "#1e1e1e", minHeight: "100vh" }}>
      <MeetingSection title="9 AM Meetings with Jaclyn" meetings={nineAMMeetings} />
      <MeetingSection title="Noon Meetings" meetings={noonMeetings} />
      <MeetingSection title="8 PM Meetings" meetings={eightPMMeetings} />
    </Box>
  );
};

export default Calender;
