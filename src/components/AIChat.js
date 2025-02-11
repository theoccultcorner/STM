import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setMessages(storedMessages);
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const fetchAIResponse = async () => {
    if (!input) return;
    setLoading(true);
    
    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          max_tokens: 200,
          messages: [...messages, newMessage],
        }),
      });
      
      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      const botMessage = { role: "bot", content: aiResponse };
      
      setMessages((prev) => [...prev, botMessage]);
      
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
          format: "mp3",
        }),
      });
      
      if (!speechRes.ok) throw new Error("Failed to fetch audio");
      
      const audioBlob = await speechRes.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Error fetching response" }]);
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
    <Card sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "70vh", display: "flex", flexDirection: "column-reverse" }}>
        {messages.slice().reverse().map((msg, index) => (
          <Typography 
            key={index} 
            sx={{ 
              padding: "8px", 
              margin: "4px 0", 
              borderRadius: "8px", 
              backgroundColor: msg.role === "user" ? "#1976d2" : "#f5f5f5", 
              color: msg.role === "user" ? "white" : "black",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "75%"
            }}
          >
            {msg.content}
          </Typography>
        ))}
      </CardContent>
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
        {loading ? "Loading..." : "Send"}
      </Button>
    </Card>
  );
};

export default AIChat;
