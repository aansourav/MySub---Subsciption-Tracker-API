import cookieParser from "cookie-parser";
import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import userRouter from "./routes/user.route.js";

const app = express();

// Connect to database first
await connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("Welcome to MySub - Subscription Tracker API");
});

app.listen(PORT, async () => {
    console.log(`MySub API is running on http://localhost:${PORT}`);
});

export default app;
