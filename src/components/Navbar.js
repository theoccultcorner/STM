import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            displayName: "Anonymous",
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            cleanDate: null,
          });
        }

        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/profile");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "white", ml: 1 }}
            >
              Sharing The Message
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            <Button color="inherit" component={Link} to="/home">Home</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/community">Community</Button>
            <Button color="inherit" component={Link} to="/just-for-today">Just for Today</Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">Profile</Button>
                <Button color="error" onClick={handleLogout}>Logout</Button>
                <Avatar
                  src={user.photoURL}
                  sx={{ width: 40, height: 40, ml: 2, border: "2px solid white" }}
                  component={Link}
                  to="/profile"
                />
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>Login</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button onClick={() => handleNavigate("/home")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate("/about")}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate("/just-for-today")}>
              <ListItemText primary="Just for Today" />
            </ListItem>
            <ListItem button onClick={() => handleNavigate("/community")}>
              <ListItemText primary="Community" />
            </ListItem>
            {user ? (
              <>
                <ListItem button onClick={() => handleNavigate("/profile")}>
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