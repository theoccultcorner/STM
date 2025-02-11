import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container, Button, Box, CircularProgress } from "@mui/material";

const SpiritualPrinciple = () => {
  const [spad, setSpad] = useState({ title: "Loading...", content: "Fetching spiritual principle..." });
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false); // Set loading to false after the content is fetched
      } catch (error) {
        console.error("Error fetching SPAD:", error);
        setSpad({ title: "Error", content: "Failed to fetch Spiritual Principle of the Day." });
        setIsLoading(false);
      }
    };

    fetchSPAD();
  }, []);

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(spad.content);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          {/* Show a loading spinner while content is being fetched */}
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Button variant="contained" color="primary" onClick={handleTextToSpeech} disabled={isLoading || !spad.content}>
                  🔊 Listen to SPAD
                </Button>
              </Box>
              <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
                {spad.title}
              </Typography>
              <Typography variant="body1" align="center" style={{ whiteSpace: "pre-line" }}>
                {spad.content}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SpiritualPrinciple;
