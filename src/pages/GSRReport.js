import React from "react";
import { Box, Typography, List, ListItem, Link, Divider } from "@mui/material";

const GSRReport = () => {
  return (
    <Box
      sx={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        backgroundColor: "#f9f9f9",
        color: "#333",
        marginBottom: "20px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
        STM GSR Report February 2025
      </Typography>

      <Divider sx={{ marginY: "20px" }} />

      <section>
        <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          Positions Available
        </Typography>
        <List>
          <ListItem>Participate in Your Recovery. STM Group Vice-Chair, Secretary, Literature & GSR needed.</ListItem>
          <ListItem>Wednesday & Friday Noon Secretary Position Open.</ListItem>
          <ListItem>Meeting Service Representatives (MSRs) needed.</ListItem>
        </List>
      </section>

      <Divider sx={{ marginY: "20px" }} />

      <section>
        <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          Meeting News
        </Typography>
        <List>
          <ListItem>STM Men’s Stag Meeting: Sign-up Sheets Posted</ListItem>
          <ListItem>STM Women’s Meeting, Sunday @ 9am needs support.</ListItem>
          <ListItem>Guad Squad NA Wednesday Meetings @ 7pm, 950A Guadalupe St.</ListItem>
          <ListItem>
            Survivors Bday/Speaker Mtgs: 605 E. Chapel St.
            <List sx={{ paddingLeft: "20px" }}>
              <ListItem>Sat, Feb. 15th & Wed, Feb. 26th @ 6pm</ListItem>
            </List>
          </ListItem>
          <ListItem>STM Birthday Mtg Saturday Feb. 22nd @ 8pm. No Speaker due to Convention.</ListItem>
          <ListItem>STM Activities Committee Mtg Feb. 8th @ 9am. Support upcoming STM Activities.</ListItem>
          <ListItem>
            STM Group Service Committee Mtg is Feb. 8th @ 10am. All Meeting Secretaries or Meeting Representatives required to attend. Come support STM & attend Group Service.
          </ListItem>
        </List>
      </section>

      <Divider sx={{ marginY: "20px" }} />

      <section>
        <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          Activities
        </Typography>
        <List>
          <ListItem>STM Co-Ed Softball Team: Sign-up Sheets Posted.</ListItem>
          <ListItem>CCNA Not Today, Cupid Roller Skate Feb. 15th @ 7:30pm, Santa Maria Skating Rink</ListItem>
          <ListItem>
            NA 33rd Central California Regional Convention @ Marriott Hotel/Mechanics Bank Arena, Bakersfield Feb. 21st-23rd
          </ListItem>
        </List>
      </section>

      <Divider sx={{ marginY: "20px" }} />

      <section>
        <Typography variant="h5" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          Other NA Announcements
        </Typography>
        <List>
          <ListItem>STM Venmo & CashApp: 7th donations, Literature Sales & Activities. Please tag $ w/info.</ListItem>
          <ListItem>STM hoodies, t-shirts, caps, coffee cups for sale. Order sheet posted.</ListItem>
          <ListItem>Celebrating a milestone in your recovery? Put your name & clean time on board.</ListItem>
          <ListItem>PR, H&I & Behind the Walls Sponsorship needs volunteers. Info posted.</ListItem>
          <ListItem>
            NA Area Information @{" "}
            <Link href="http://centralcoastna.org" target="_blank" rel="noopener">
              centralcoastna.org
            </Link>
          </ListItem>
        </List>
      </section>
    </Box>
  );
};

export default GSRReport;
