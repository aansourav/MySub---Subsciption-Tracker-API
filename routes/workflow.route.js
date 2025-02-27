import { Router } from "express";
import { sendReminders } from "../controllers/workflow.controller.js";

const workflowRouter = Router();

// /api/v1/workflows - GET - Get all workflows
workflowRouter.post("/subscription/reminder", sendReminders);

export default workflowRouter;
