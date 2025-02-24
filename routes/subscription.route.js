import { Router } from "express";
import {
    createSubscription,
    getUserSubscriptions,
    updateSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

// /api/v1/subscriptions - GET All Subscriptions
subscriptionRouter.get("/", (req, res) =>
    res.send({ title: "GET All Subscriptions" })
);

// /api/v1/subscriptions/upcoming-renewals - GET Upcoming Renewals
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
    res.send({ title: "GET Upcoming Renewals" })
);

// /api/v1/subscriptions/:id - GET Subscription Details By Id
subscriptionRouter.get("/:id", (req, res) =>
    res.send({ title: "GET Subscription Details By Id" })
);

// /api/v1/subscriptions
subscriptionRouter.post("/", authorize, createSubscription);

// /api/v1/subscriptions/:id - UPDATE Subscription
subscriptionRouter.put("/:id", authorize, updateSubscription);

// /api/v1/subscriptions/:id - DELETE Subscription
subscriptionRouter.delete("/:id", (req, res) =>
    res.send({ title: "DELETE Subscription" })
);

// /api/v1/subscriptions/user/:id - GET All Subscriptions By User Id
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// /api/v1/subscriptions/:id/cancel - CANCEL Subscription
subscriptionRouter.put("/:id/cancel", (req, res) =>
    res.send({ title: "CANCEL Subscription" })
);

export default subscriptionRouter;
