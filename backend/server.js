require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const textEnhancerRoutes = require("./routes/textEnhancerRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/text-enhancer", textEnhancerRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!", success: true });
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
