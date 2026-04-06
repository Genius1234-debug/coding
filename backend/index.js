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

// ✅ FIXED CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      "https://coding-z737.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);

// ✅ FIXED PORT
const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});