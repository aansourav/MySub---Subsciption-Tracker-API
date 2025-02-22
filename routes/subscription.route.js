import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
    res.send({ title: "GET All Subscriptions" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
    res.send({ title: "GET Upcoming Renewals" })
);
subscriptionRouter.get("/:id", (req, res) =>
    res.send({ title: "GET Subscription Details By Id" })
);
subscriptionRouter.post("/", (req, res) =>
    res.send({ title: "CREATE New Subscription" })
);
subscriptionRouter.put("/:id", (req, res) =>
    res.send({ title: "UPDATE Subscription" })
);
subscriptionRouter.delete("/:id", (req, res) =>
    res.send({ title: "DELETE Subscription" })
);
subscriptionRouter.get("/user/:id", (req, res) =>
    res.send({ title: "GET All Subscriptions By User Id" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
    res.send({ title: "CANCEL Subscription" })
);

export default subscriptionRouter;
