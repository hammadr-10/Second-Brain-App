import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import cookieParser from "cookie-parser";
import cors from "cors";
import brainRouter from "./routes/brain";
import path from "path";
import { fileURLToPath } from "url"; // <-- Add this

const __filename = fileURLToPath(import.meta.url); // <-- Add this
const __dirname = path.dirname(__filename);        // <-- Add this

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);

// Serve static files from frontend build (for production)
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Fallback: serve index.html for any route not handled above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

export default app;