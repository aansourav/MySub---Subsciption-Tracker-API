import { Router } from "express";
import {
    createSubscription,
    getUserSubscriptions,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

// /api/v1/subscriptions
subscriptionRouter.get("/", (req, res) =>
    res.send({ title: "GET All Subscriptions" })
);

// /api/v1/subscriptions/upcoming-renewals
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
    res.send({ title: "GET Upcoming Renewals" })
);

// /api/v1/subscriptions/:id
subscriptionRouter.get("/:id", (req, res) =>
    res.send({ title: "GET Subscription Details By Id" })
);

// /api/v1/subscriptions
subscriptionRouter.post("/", authorize, createSubscription);

// /api/v1/subscriptions/:id
subscriptionRouter.put("/:id", (req, res) =>
    res.send({ title: "UPDATE Subscription" })
);

// /api/v1/subscriptions/:id
subscriptionRouter.delete("/:id", (req, res) =>
    res.send({ title: "DELETE Subscription" })
);

// /api/v1/subscriptions/user/:id
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// /api/v1/subscriptions/:id/cancel
subscriptionRouter.put("/:id/cancel", (req, res) =>
    res.send({ title: "CANCEL Subscription" })
);

export default subscriptionRouter;
