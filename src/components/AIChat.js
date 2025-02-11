import React, { useState, useEffect } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from sessionStorage
  useEffect(() => {
    const storedMessages = JSON.parse(sessionStorage.getItem("chatHistory")) || [];
    setMessages(storedMessages);
  }, []);

  // Save chat history to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const fetchAIResponse = async () => {
    if (!input) return;
    setLoading(true);
    
    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    
    try {
      console.log("Sending request to OpenAI API...");
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_OPENAI}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          max_tokens: 200,
          messages: updatedMessages.map((msg) => ({ role: msg.role, content: msg.content })),
        }),
      });
      
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} - ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("API Response:", data);
      
      const aiResponse = data.choices?.[0]?.message?.content || "No response";
      const botMessage = { role: "bot", content: aiResponse };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Convert AI response to speech
      console.log("Fetching speech response...");
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
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2, boxShadow: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "52.5vh", display: "flex", flexDirection: "column-reverse", bgcolor: "#f9f9f9", padding: 2, borderRadius: 2 }}>
        {messages.length === 0 && (
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2, textAlign: "center" }}>
                 Disclaimer: This AI chat does not store, track, or share any data with external servers or third parties. All conversation history is stored only in your browser’s cache and can be erased by clearing your cache and history. No records are kept beyond your local device. This service is fully funded by its anonymous creator, who values user privacy and ensures it will always remain free, secure, and accessible to all.
                     </Typography>
        )}
        {messages.slice().reverse().map((msg, index) => (
          <Box key={index} sx={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "10px",
          }}>
            <Typography 
              sx={{
                padding: "8px", 
                borderRadius: "12px", 
                backgroundColor: msg.role === "user" ? "#1976d2" : "#e0e0e0", 
                color: msg.role === "user" ? "white" : "black",
                maxWidth: "75%"
              }}
            >
              {msg.content}
            </Typography>
          </Box>
        ))}
      </CardContent>
      <Box sx={{ display: "flex", padding: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Talk to your NA Sponsor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={fetchAIResponse} disabled={loading}>
          {loading ? "Loading..." : "Ask Leonard"}
        </Button>
      </Box>
    </Card>
  );
};

export default AIChat;
