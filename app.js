import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import connectDB from "./database/mongodb.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
    res.send("Welcome to MySub - Subscription Tracker API");
});

app.listen(PORT, async () => {
    console.log(`MySub API is running on http://localhost:${PORT}`);
    await connectDB();
});

export default app;
