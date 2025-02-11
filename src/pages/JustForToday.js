import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container, Button, Box } from "@mui/material";

const JustForToday = () => {
  const [jft, setJft] = useState({ title: "Loading...", content: "Fetching daily meditation..." });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJFT = async () => {
      try {
        const response = await axios.get(
          `https://api.allorigins.win/raw?url=${encodeURIComponent("https://www.jftna.org/jft/")}`
        );

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "text/html");

        // Extract title
        const title = doc.querySelector("h1")?.textContent?.trim() || "Just for Today";

        // Extract content
        let content = "Content not found.";
        const textElements = doc.querySelectorAll("table tr, p, div");

        let extractedText = "";
        textElements.forEach((el) => {
          let text = el.textContent.trim();
          if (text) {
            if (text.includes("Page")) {
              text = `\n\n${text}\n\n`;
            } else if (/\d{1,2} [A-Za-z]+ \d{4}/.test(text)) {
              text = `\n\n### ${text} ###\n\n`;
            }
            extractedText += text + "\n\n";
          }
        });

        content = extractedText.trim();

        setJft({ title, content });
      } catch (error) {
        console.error("Error fetching JFT:", error);
        setJft({ title: "Error", content: "Failed to fetch Just for Today." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJFT();
  }, []);

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech is not supported in your browser.");
      return;
    }

    const speech = new SpeechSynthesisUtterance(jft.content);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTextToSpeech}
              disabled={isLoading || !jft.content}
            >
              🔊 Listen to JFT
            </Button>
          </Box>
          <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
            {isLoading ? "Loading..." : jft.title}
          </Typography>
          <Typography variant="body1" align="center" sx={{ whiteSpace: "pre-line" }}>
            {isLoading ? "Fetching the content..." : jft.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JustForToday;
