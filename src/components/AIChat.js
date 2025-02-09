import React, { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAIResponse = async () => {
    if (!input) return;
    setLoading(true);
    setResponse("");
    
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          max_tokens: 50,
          messages: [
            { role: "system", content: "You are an AI trained to act as a Narcotics Anonymous sponsor. Provide brief guidance and encouragement based on the 12-step program." },
            { role: "user", content: input }
          ],
        }),
      });
      
      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      setResponse(aiResponse);
      
      // Convert AI response to speech
      const speechRes = await fetch("https://api.elevenlabs.io/v1/text-to-speech/M7R7e4SuLxy12UoVkVu9", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": `${process.env.REACT_APP_ELEVENLABS}`,
        },
        body: JSON.stringify({
          text: aiResponse,
          model_id: "eleven_multilingual_v1",
          format: "mp3"
        }),
      });

      if (!speechRes.ok) throw new Error("Failed to fetch audio");
      
      const audioBlob = await speechRes.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchAIResponse();
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Talk to your NA Sponsor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={fetchAIResponse} disabled={loading}>
          {loading ? "Loading..." : "Ask Leonard"}
        </Button>
        {response && <p style={{ marginTop: "1rem", color: "#333" }}>{response}</p>}
      </CardContent>
    </Card>
  );
};

export default AIChat;
