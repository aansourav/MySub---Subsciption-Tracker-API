import { Router } from "express";

const workflowRouter = Router();

// /api/v1/workflows - GET - Get all workflows
workflowRouter.get("/", (req, res) => {
    res.send({ title: "WORKFLOW" });
});

export default workflowRouter;


