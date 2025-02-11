import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container, Button, Box } from "@mui/material";

const JustForToday = () => {
  const [jft, setJft] = useState({ title: "Loading...", content: "Fetching daily meditation..." });

  useEffect(() => {
    const fetchJFT = async () => {
      try {
        const response = await axios.get(
          "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.jftna.org/jft/")
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.contents, "text/html");

        const title = doc.querySelector("h1")?.textContent?.trim() || "Just for Today";
        
        let content = "Content not found.";
        
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

  const handleTextToSpeech = () => {
    const speech = new SpeechSynthesisUtterance(jft.content);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
        <Button variant="contained" color="primary" onClick={handleTextToSpeech}>
              🔊 Listen to JFT
            </Button>
          <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
            {jft.title}
          </Typography>
          <Typography variant="body1" align="center" style={{ whiteSpace: "pre-line" }}>
            {jft.content}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
       
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JustForToday;
