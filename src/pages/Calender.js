import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const Calendar = () => {
  const schedule = [
    { time: '9 AM', Sunday: 'Ladies\nJaclyn' },
    { time: '12 PM', Sunday: 'Joe', Monday: 'Mark', Tuesday: 'Peanut', Wednesday: 'NOON\nMichael B\n2nd Wed Keytags\nStick Meeting', Thursday: 'Cambria', Friday: 'Juanita', Saturday: 'T' },
    { time: '8 PM', Sunday: 'Gregory', Monday: 'Daniel M.', Tuesday: 'Cynthia', Wednesday: 'Araceli', Thursday: 'Dinah R.', Friday: 'SPAD\nNellie P.', Saturday: 'Michael B' },
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Meeting Schedule
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {schedule.map((slot, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ minHeight: '150px', backgroundColor: '#ffffff', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" textAlign="center">
                  {slot.time}
                </Typography>
                <Box sx={{ marginTop: '10px' }}>
                  {days.map((day) => (
                    <Typography
                      key={day}
                      variant="body2"
                      sx={{ color: slot[day] ? 'black' : '#999', textAlign: 'center' }}
                    >
                      <strong>{day}: </strong> {slot[day] || 'No Meeting'}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calendar;
