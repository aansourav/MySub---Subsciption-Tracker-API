import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET All Subscriptions" }));


export default subscriptionRouter;
