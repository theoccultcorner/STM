import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Handle Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if user exists in Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            displayName: "Anonymous",
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            cleanDate: null, // User can set later
          });
        }

        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/profile"); // Redirect to Profile after login
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ display: { xs: "block", md: "none" } }} onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          {/* Website Title */}
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}>
            Sharing The Message
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/community">Community</Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">Profile</Button>
                <Button color="error" onClick={handleLogout}>Logout</Button>
                <Avatar src={user.photoURL} sx={{ width: 32, height: 32, marginLeft: "10px" }} />
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/about">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/community">
              <ListItemText primary="Community" />
            </ListItem>
            {user ? (
              <>
                <ListItem button component={Link} to="/profile">
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <ListItem button onClick={handleLogin}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
