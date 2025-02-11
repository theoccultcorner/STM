import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const Profile = () => {
  const [username, setUsername] = useState("Anonymous");
  const [cleanDate, setCleanDate] = useState("");
  const [cleanTime, setCleanTime] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.displayName || "Anonymous");
          setCleanDate(userData.cleanDate || "");
          setPhotoURL(userData.photoURL || "");
          setBio(userData.bio || "");
          setTheme(userData.theme || "default");
          calculateCleanTime(userData.cleanDate);
        } else {
          setDoc(userRef, { displayName: "Anonymous", cleanDate: "", photoURL: "", bio: "", theme: "default" });
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const calculateCleanTime = (date) => {
    if (date) {
      const cleanStartDate = dayjs(date);
      const now = dayjs();
      const diff = dayjs.duration(now.diff(cleanStartDate));
      setCleanTime(`${diff.years()} years, ${diff.months()} months, ${diff.days()} days clean`);
    }
  };

  const handleSaveProfile = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, { displayName: username, cleanDate, bio, theme }, { merge: true });
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  if (loading) return <CircularProgress sx={{ margin: "auto", display: "block" }} />;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Avatar src={photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h4">Welcome, {username}!</Typography>

      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "10px", width: "300px" }}
      />

      <TextField
        label="Bio"
        multiline
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ marginBottom: "10px", width: "300px" }}
      />

      <TextField
        label="Clean Date"
        type="date"
        value={cleanDate}
        onChange={(e) => setCleanDate(e.target.value)}
        sx={{ marginBottom: "10px", width: "300px" }}
        InputLabelProps={{ shrink: true }}
      />

      {cleanTime && <Typography variant="body1" sx={{ marginBottom: "10px" }}>{cleanTime}</Typography>}

      <FormControl sx={{ width: "300px", marginBottom: "10px" }}>
        <InputLabel>Theme</InputLabel>
        <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="dark">Dark Mode</MenuItem>
          <MenuItem value="light">Light Mode</MenuItem>
          <MenuItem value="colorful">Colorful</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ marginBottom: "10px" }}>
        Save Profile
      </Button>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
