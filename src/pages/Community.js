import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import dayjs from "dayjs";

const Community = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            displayName: data.displayName || "Anonymous",
            cleanDate: data.cleanDate || null,
          };
        });

        // Calculate clean time
        const sortedUsers = userList.map((user) => {
          let cleanDays = 0;
          if (user.cleanDate) {
            cleanDays = dayjs().diff(dayjs(user.cleanDate), "day");
          }
          return { ...user, cleanDays };
        }).sort((a, b) => b.cleanDays - a.cleanDays); // Sort by longest clean time

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
          <Card key={user.id} sx={{ marginBottom: "10px", maxWidth: "500px", margin: "auto" }}>
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
