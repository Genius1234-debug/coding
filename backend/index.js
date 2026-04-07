import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database-config.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import userRoutes from "./routes/auth-route.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (FINAL & SIMPLE)
const allowedOrigins = [
  "https://localhost:5173",
  "https://localhost:5175",
 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

// ✅ BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ ROUTES
app.use("/api/ai", aiRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ PORT
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
