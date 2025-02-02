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
      const userList = snapshot.docs.map((doc) => {
        const data = doc.data();
        let cleanDays = 0;
        if (data.cleanDate) {
          cleanDays = dayjs().diff(dayjs(data.cleanDate), "day");
        }
        return {
          id: doc.id,
          displayName: data.username || "Anonymous",
          cleanDate: data.cleanDate || null,
          cleanDays,
          photoURL: data.photoURL || "https://via.placeholder.com/100",
        };
      });

      // Sort users by longest clean time
      setUsers(userList.sort((a, b) => b.cleanDays - a.cleanDays));
      setLoading(false);
    });

    return () => unsubscribe(); // Unsubscribe from real-time updates
  }, []);

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        Community Members
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        users.map((user) => (
          <Card key={user.id} sx={{ marginBottom: "10px", maxWidth: "500px", margin: "auto", padding: "10px", display: "flex", alignItems: "center" }}>
            <Avatar src={user.photoURL} sx={{ width: 50, height: 50, marginRight: "10px" }} />
            <CardContent>
              <Typography variant="h6">{user.displayName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {user.cleanDate ? `${user.cleanDays} Days Clean` : "Clean Time Not Set"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default Community;
