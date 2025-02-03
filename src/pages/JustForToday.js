import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container } from "@mui/material";

const JustForToday = () => {
  const [jft, setJft] = useState({ title: "Loading...", content: "Fetching daily meditation..." });

  useEffect(() => {
    const fetchJFT = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/https://www.jftna.org/jft/"
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "text/html");

        const title = doc.querySelector("h1")?.textContent?.trim() || "Just for Today";
        
        let content = "Content not found.";
        
        // Extract structured content from the table
        const rows = doc.querySelectorAll("table tr");
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

        setJft({ title, content });
      } catch (error) {
        console.error("Error fetching JFT:", error);
        setJft({ title: "Error", content: "Failed to fetch Just for Today." });
      }
    };

    fetchJFT();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
            {jft.title}
          </Typography>
          <Typography variant="body1" align="center" style={{ whiteSpace: "pre-line" }}>
            {jft.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JustForToday;