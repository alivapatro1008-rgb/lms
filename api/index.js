import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../server/configs/mongodb.js";
import connectCloudinary from "../server/configs/cloudinary.js";

import { clerkWebhooks, stripeWebhooks } from "../server/controllers/webhooks.js";
import educatorRouter from "../server/routes/educatorRoutes.js";
import courseRouter from "../server/routes/courseRoute.js";
import userRouter from "../server/routes/userRoutes.js";

import { clerkMiddleware } from "@clerk/express";

const app = express();

// Connect DB
await connectDB();
await connectCloudinary();

// 🔥 Stripe route (RAW BODY)
app.post("/stripe", express.raw({ type: "*/*" }), stripeWebhooks);

// Normal middlewares
app.use(cors());
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => res.send("API Working"));
app.post("/clerk", express.json(), clerkWebhooks);

app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);

// ❌ NO app.listen()

export default app;