import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const Profile = () => {
  const [username, setUsername] = useState("Anonymous");
  const [cleanDate, setCleanDate] = useState("");
  const [cleanTime, setCleanTime] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
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
          calculateCleanTime(userData.cleanDate);
        } else {
          setDoc(userRef, { displayName: "Anonymous", cleanDate: "", photoURL: "" });
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
    await setDoc(userRef, { displayName: username, cleanDate }, { merge: true });

    if (newPhoto) {
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, newPhoto);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);
      await setDoc(userRef, { photoURL: downloadURL }, { merge: true });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto(file);
      const objectUrl = URL.createObjectURL(file);
      setPhotoURL(objectUrl);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  if (loading) return <CircularProgress sx={{ margin: "auto", display: "block" }} />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <Avatar src={photoURL} sx={{ width: 100, height: 100, mb: 2 }} />
      
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      
      <Typography variant="h4">Welcome, {username}!</Typography>

      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ marginBottom: "10px", width: "300px" }} />
      
      <TextField label="Clean Date" type="date" value={cleanDate} onChange={(e) => setCleanDate(e.target.value)} sx={{ marginBottom: "10px", width: "300px" }} InputLabelProps={{ shrink: true }} />

      {cleanTime && <Typography variant="body1" sx={{ marginBottom: "10px" }}>{cleanTime}</Typography>}

      <Button variant="contained" color="primary" onClick={handleSaveProfile} sx={{ marginBottom: "10px" }}>Save Profile</Button>

      <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default Profile;
