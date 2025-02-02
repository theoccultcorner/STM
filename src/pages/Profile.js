import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut } from "firebase/auth";
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [cleanDate, setCleanDate] = useState("");
  const [cleanTime, setCleanTime] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUser(auth.currentUser);
          setUsername(userData.username || "Anonymous");
          setCleanDate(userData.cleanDate || "");
          setPhotoURL(userData.photoURL || auth.currentUser.photoURL || "");
          calculateCleanTime(userData.cleanDate);
        } else {
          await setDoc(userRef, {
            username: "Anonymous",
            cleanDate: "",
            photoURL: auth.currentUser.photoURL || "",
          });
          setUsername("Anonymous");
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
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
    await setDoc(userRef, {
      username,
      cleanDate,
      photoURL,
    }, { merge: true });

    calculateCleanTime(cleanDate);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/"; // Redirect to home page
  };

  const handleUploadPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setPhotoURL(downloadURL);

      // Save the new profile image to Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, { photoURL: downloadURL }, { merge: true });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <Avatar
        src={photoURL}
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <input type="file" accept="image/*" onChange={handleUploadPhoto} />
      {uploading && <CircularProgress sx={{ margin: "10px" }} />}
      
      <Typography variant="h4">Welcome, {username}!</Typography>

      {/* Username Field */}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "10px", width: "300px" }}
      />

      {/* Clean Date Field */}
      <TextField
        label="Clean Date"
        type="date"
        value={cleanDate}
        onChange={(e) => setCleanDate(e.target.value)}
        sx={{ marginBottom: "10px", width: "300px" }}
        InputLabelProps={{ shrink: true }}
      />

      {/* Display Clean Time */}
      {cleanTime && (
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          {cleanTime}
        </Typography>
      )}

      {/* Save Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        sx={{ marginBottom: "10px" }}
      >
        Save Profile
      </Button>

      {/* Logout Button */}
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
