import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Box, Typography, Card, CardContent, CircularProgress, Avatar } from "@mui/material";
import dayjs from "dayjs";

const Community = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        displayName: doc.data().displayName || "Anonymous",
        cleanDate: doc.data().cleanDate || null,
        photoURL: doc.data().photoURL || "",
        bio: doc.data().bio || "No bio available",
        themeColor: doc.data().themeColor || "#ffffff",
        cleanDays: doc.data().cleanDate ? dayjs().diff(dayjs(doc.data().cleanDate), "day") : 0,
      }));

      setUsers(userList.sort((a, b) => b.cleanDays - a.cleanDays));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>Community Members</Typography>

      {loading ? <CircularProgress /> : users.map((user) => (
        <Card key={user.id} sx={{ marginBottom: "10px", maxWidth: "500px", margin: "auto", backgroundColor: user.themeColor, color: user.themeColor === "#000000" ? "white" : "black" }}>
          <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={user.photoURL} sx={{ width: 50, height: 50 }} />
            <Box>
              <Typography variant="h6">{user.displayName}</Typography>
              <Typography variant="body2">{user.cleanDays} Days Clean</Typography>
              <Typography variant="body2" sx={{ fontStyle: "italic", marginTop: "5px" }}>{user.bio}</Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Community;
