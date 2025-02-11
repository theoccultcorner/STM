import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container } from "@mui/material";

const SpiritualPrinciple = () => {
  const [spad, setSpad] = useState({ title: "Loading...", content: "Fetching spiritual principle..." });

  useEffect(() => {
    const fetchSPAD = async () => {
      try {
        const response = await axios.get(
          "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.spadna.org/")
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.contents, "text/html");

        const title = doc.querySelector("h1")?.textContent?.trim() || "Spiritual Principle of the Day";
        
        let content = "Content not found.";
        
        // Extract structured content from the table or div
        const rows = doc.querySelectorAll("table tr, div.content");
        let extractedText = "";

        rows.forEach(row => {
          let text = row.textContent.trim();
          if (text.includes("Page")) {
            text = `\n\n${text}\n\n`;
          } else if (/\d{1,2} [A-Za-z]+ \d{4}/.test(text)) {
            text = `\n\n### ${text} ###\n\n`;
          }
          extractedText += text + "\n\n";
        });

        content = extractedText.trim();

        setSpad({ title, content });
      } catch (error) {
        console.error("Error fetching SPAD:", error);
        setSpad({ title: "Error", content: "Failed to fetch Spiritual Principle of the Day." });
      }
    };

    fetchSPAD();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
            {spad.title}
          </Typography>
          <Typography variant="body1" align="center" style={{ whiteSpace: "pre-line" }}>
            {spad.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpiritualPrinciple;
