import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Container, Button, Box, CircularProgress } from "@mui/material";

const SpiritualPrinciple = () => {
  const [spad, setSpad] = useState({ title: "Loading...", content: "Fetching spiritual principle..." });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSPAD = async () => {
      try {
        // Use your local CORS proxy
        const proxyUrl = "http://localhost:8080/"; // Change this if deployed
        const targetUrl = "https://www.spadna.org/";
        const response = await axios.get(`${proxyUrl}${encodeURIComponent(targetUrl)}`);

        // Log the raw response data to debug
        console.log("Raw HTML Response:", response.data);

        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data, "text/html");

        // Extract title
        const title = doc.querySelector("h1")?.textContent?.trim() || "Spiritual Principle of the Day";

        // Extract content
        let content = "Content not found.";
        const textElements = doc.querySelectorAll("table tr, div.content, p");

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
        if (!content) content = "No content found on the page.";

        setSpad({ title, content });
      } catch (error) {
        console.error("Error fetching SPAD:", error);
        setErrorMessage("Failed to fetch Spiritual Principle of the Day.");
      } finally {
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
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "20px" }}>
      <Card sx={{ padding: 3, boxShadow: 3 }}>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <CircularProgress />
            </Box>
          ) : errorMessage ? (
            <Typography variant="h6" align="center" color="error">
              {errorMessage}
            </Typography>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTextToSpeech}
                  disabled={isLoading || !spad.content}
                >
                  🔊 Listen to SPAD
                </Button>
              </Box>
              <Typography variant="h4" component="h1" align="center" color="black" gutterBottom>
                {spad.title}
              </Typography>
              <Typography variant="body1" align="center" sx={{ whiteSpace: "pre-line" }}>
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
