// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

/* ================================
   MODELS
================================ */

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Playlist Schema
const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  songs: [{ title: String, artist: String, url: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

/* ================================
   ROUTES
================================ */

// Test route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    res.status(400).json({ error: "User registration failed ❌", details: err });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials ❌" });

    res.json({ message: "Login successful ✅", username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Login failed ❌", details: err });
  }
});

// Add Playlist
app.post("/playlists", async (req, res) => {
  try {
    const { username, title, songs } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found ❌" });

    const newPlaylist = new Playlist({
      title,
      songs,
      user: user._id
    });

    await newPlaylist.save();
    res.status(201).json({ message: "Playlist added ✅", playlist: newPlaylist });
  } catch (err) {
    res.status(400).json({ error: "Adding playlist failed ❌", details: err });
  }
});

// Get User Playlists
app.get("/playlists/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found ❌" });

    const playlists = await Playlist.find({ user: user._id });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Fetching playlists failed ❌", details: err });
  }
});

/* ================================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
